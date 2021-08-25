import * as express from 'express'
import * as http from 'http'

import {message} from './helper/localization/'
import config from './setup/config'
import {Server} from 'socket.io'
import {Pool} from 'pg'
import {createAdapter} from '@socket.io/postgres-adapter'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
	cors: {
		origin: config.server.origin,
		methods: ['GET', 'POST'],
	},
})

const pool = new Pool({
	user: 'noghte-bazi',
	host: 'localhost',
	database: 'noghte-bazi',
	password: 'password',
	port: 5432,
})

pool.query(`
  create table if not exists user (
    id uuid unique primary key
    first_name text
    last_name text
    credit integer,
  )
`).then(console.log)
pool.query(`
  create table if not exists player (
    id uuid unique primary key
    user_id uuid references user (id)
    role text
    color text
    score integer
    has_permission boolean
    is_connected boolean
  )
`).then(console.log)
// pen is an many to many relation between player and game
pool.query(`
  create table if not exists pen (
    player_id uuid references player (id)
    game_id uuid references paper (id)
    primary key (player_id, paper_id)
  )
`).then(console.log)

pool.query(`
  create table if not exists paper (
    id uuid unique primary key
    is_finished boolean
    size integer
    winner uuid references player (id)
    last_line uuid references line (id)
  )
`).then(console.log)
pool.query(`
  create table if not exists line (
    id uuid unique primary key
    i integer
    j integer
    paper_id uuid references paper (id)
    color text
  )
`).then(console.log)

pool.query(`
    create table if not exists message (
      id uuid unique primary key
      paper_id uuid references paper (id)
      sender uuid references player (id)
    )
`).then(console.log)

const rooms = []
const users = []

type line = {
	i: number
	j: number
	color: string
}

type message = {}

type user = {
	id: string
	score: number
	roomIds: string[]
	color: string
	hasPermission: boolean
	role: string
	isConnected: boolean
	socketId: string
	name: string
}

type room = {
	id: string
	userIds: string[]
	subscriberIds: string[]
	turn: string
	isEnded: boolean
	socketIds: string[]
	lastMove: line
	history: line[]
	messages: message[]
	size: number
	winner: user
}
const createRoom = (
	socketId: string,
	paperSize: number,
	roomId: string,
): room => {
	const room = {
		id: roomId,
		userIds: [],
		subscriberIds: [],
		history: [],
		turn: 'red',
		isEnded: false,
		socketIds: [socketId],
		lastMove: null,
		messages: [],
		size: paperSize,
		winner: undefined,
	}
	rooms.push(room)
	console.log('-------->', room.userIds)
	return room
}

const createUser = (userId: string, socketId: string): user => {
	const user = {
		id: userId,
		score: 0,
		roomIds: [],
		color: '',
		hasPermission: false,
		role: '',
		isConnected: false,
		socketId,
		name: '',
	}
	users.push(user)
	return user
}

const findRoomById = (roomId: string): room | undefined =>
	rooms.find(room => room.id === roomId)
const findUserById = (userId: string, roomId: string): user | undefined =>
	users.find(user =>
		 !!(user.id === userId && user.roomIds.includes(roomId))
	)

const findUserBySocketId = (socketId: string): user | undefined =>
	users.find(user => user.socketId === socketId)
const findRoomBySocketId = (socketId: string): room | undefined =>
	rooms.find(room => room.socketIds.includes(socketId))

const configUser = ({
	user,
	room,
	color,
	hasPermission,
	role,
	isConnected,
	socketId,
}) => {
	user.roomIds.push(room.id)
	user.color = color
	user.hasPermission = hasPermission
	user.role = role
	user.isConnected = isConnected
	user.socketId = socketId
}
const hostFirstUser = (room: room, user: user, socket: any) => {
	console.log(
		`hosting first user with userId: ${user.id} in room with roomId: ${room.id}`,
	)

	configUser({
		user,
		room,
		color: 'red',
		hasPermission: true,
		role: 'player',
		isConnected: true,
		socketId: socket.id,
	})
	room.turn = 'red'
	room.userIds.push(user.id)
	room.socketIds.push(socket.id)

	socket.emit('hasPermission', user.hasPermission)
	socket.emit('watch', room.history, room.messages)

	socket.join(room.id)
	socket.emit('color', 'red')
	socket.emit('score', user.score)

	socket.emit('mustWait', true)
}

const hostSecondUser = (room: room, user: user, socket: any) => {
	console.log(
		`hosting second user with userId: ${user.id} in room with roomId: ${room.id}`,
	)

	if (room.isEnded) {
		const opponentId =
			room.userIds[0] === user.id ? room.userIds[1] : room.userIds[0]
		const opponent = findUserById(opponentId, room.id)
		socket.emit('color', user.color)
		socket.emit('hasPermission', false)
		socket.emit('watch', room.history, room.messages)
		socket.emit('score', user.score)
		io.to(room.id).emit('mustWait', false)
		socket.emit('name', opponent.id, opponent.score, opponent.color)
	} else {
		configUser({
			user,
			room,
			color: undefined,
			hasPermission: false,
			role: 'player',
			isConnected: true,
			socketId: socket.id,
		})
		const secondUser = findUserById(
			room.userIds[0] === user.id ? room.userIds[1] : room.userIds[0],
			room.id,
		)
		console.log('roomTurn: ', room.turn)
		if (secondUser && secondUser.color === 'red') user.color = 'blue'
		else user.color = 'red'
		user.hasPermission = room.turn === user.color
		console.log('user has permission? ', user.hasPermission)
		if (!room.userIds.includes(user.id)) room.userIds.push(user.id)
		if (!room.socketIds.includes(socket.id)) room.socketIds.push(socket.id)

		socket.emit('color', user.color)
		socket.emit('hasPermission', user.hasPermission)
		socket.emit('watch', room.history, room.messages)
		socket.emit('score', user.score)
		socket.join(room.id)
		io.to(room.id).emit('mustWait', false)
		io.to(room.id).emit('introduce', 'hello')
	}
}

const hostSubscriber = (room: room, user: user, socket: any) => {
	console.log(
		`hosting subscriber with userId: ${user.id} in room with roomId: ${room.id}`,
	)
	configUser({
		user,
		room,
		color: undefined,
		hasPermission: false,
		role: 'subscriber',
		isConnected: true,
		socketId: socket.id,
	})
	room.subscriberIds.push(user.id)
	socket.join(room.id)
	socket.emit('role', 'subscriber', room.turn)
	socket.emit('watch', room.history, room.messages)
}

const directUserToRoom = (
	roomId: string,
	userId: string,
	socket: any,
	paperSize: number,
) => {
	const room = findRoomById(roomId) || createRoom(socket.id, paperSize, roomId)
	const user = findUserById(userId, roomId) || createUser(userId, socket.id)
	if (
		(room.userIds.includes(user.id) && user.isConnected === true) ||
		!userId ||
		!roomId
	) {
		socket.emit('warning', 'multiple device')
		socket.disconnect(true)
	} else {
		switch (room.userIds.length) {
			case 0:
				hostFirstUser(room, user, socket)
				break
			case 1:
				hostSecondUser(room, user, socket)
				break
			default:
				if (!!findUserById(userId, roomId)) hostSecondUser(room, user, socket)
				else hostSubscriber(room, user, socket)
				break
		}
	}
}

const checkValidation = (room: room, user: user, type: string): boolean => {
	const result =
		user && room && user.isConnected && !room.isEnded && user.role === 'player'
	if (type === 'change') {
		console.log(
			`check validation user id: ${user.id} hasPermission is: ${user.hasPermission}`,
		)
		return user.hasPermission && room.turn === user.color && result
	} else {
		console.log(
			`check validation user id: ${user.id}`,
			!user.hasPermission,
			room.turn !== user.color,
			result,
		)
		return !user.hasPermission && room.turn !== user.color && result
	}
}

const changeTurn = (room: room, userId: string): boolean => {
	if (room && room.turn === 'red') room.turn = 'blue'
	else if (room && room.turn === 'blue') room.turn = 'red'
	for (let i = 0; i < room.userIds.length; i++) {
		const user = findUserById(room.userIds[i], room.id)
		user.hasPermission = user.id !== userId;
	}
	return true
}
const check = (room: room, user: user, type: string): boolean => {
	if (checkValidation(room, user, type)) return changeTurn(room, user.id)
	return false
}

io.on('isConnected', socket => {
	socket.emit('handshake', 'welcome! give me your room id!')
	socket.on('handshake', ({ roomId, userId, paperSize }) =>
		directUserToRoom(roomId, userId, socket, paperSize),
	)
	socket.on('introduce', (userId: string, roomId: string) => {
		const user = findUserById(userId, roomId)
		socket.broadcast.to(roomId).emit('name', userId, user.score, user.color)
		socket.emit('message', {
			sender: 'noghte-bazi',
			content: message.default.welcome,
		})
	})
	socket.on('disconnect', () => {
		const user = findUserBySocketId(socket.id)
		const room = findRoomBySocketId(socket.id)
		console.log(
			`user with ${user ? 'user' : 'socket'}id ${
				user ? user.id : socket.id
			} disconnected`,
		)
		if (user) user.isConnected = false
		if (user && user.role === 'player')
			socket.broadcast.to(room.id).emit('mustWait', true)
	})
	socket.on('change', (userId: string, roomId: string, line: line) => {
		const room = findRoomById(roomId)
		const user = findUserById(userId, roomId)
		console.log('new line arrived: ', line)
		if (check(room, user, 'change')) {
			const { i, j, color } = line
			line.color = user.color
			room.lastMove = line
			room.history[i] = { ...room.history[i] }
			room.history[i][j] = color
			socket.broadcast.to(room.id).emit('change', line, color)
		} else socket.emit('warning', 'warning')
	})
	socket.on('bonus', (roomId: string, userId: string, bonus: line) => {
		const room = findRoomById(roomId)
		const user = findUserById(userId, roomId)
		if (user && user.color === bonus.color) {
			const { i, j, color } = bonus
			if (room.history[i] && room.history[i][j]) {
			} else {
				console.log(`new bonus arrived:`, bonus, `from user:`, user.id)
				room.history[i] = { ...room.history[i] }
				room.history[i][j] = color
				user.score += 1

				// sending gift!
				if (room) room.turn = user.color
				let sumOfScores = 0
				for (let i = 0; i < room.userIds.length; i++) {
					const user = findUserById(room.userIds[i], room.id)
					sumOfScores += user.score
					user.hasPermission = user.id === userId;
				}
				io.to(roomId).emit('gift', userId)
				console.log(sumOfScores, room.size)

				if (sumOfScores === (room.size - 1) * (room.size - 1)) {
					room.isEnded = true
					console.log(user.score)
					for (let i = 0; i < room.userIds.length; i++) {
						const user = findUserById(room.userIds[i], room.id)
						console.log(sumOfScores, user.score)
						if (user.score > sumOfScores - user.score)
							user.id === userId
								? socket.emit('message', {
										sender: 'noghte-bazi',
										content: message.default.end.winner,
								  })
								: socket.broadcast.to(roomId).emit('message', {
										sender: 'noghte-bazi',
										content: message.default.end.winner,
								  })
						else
							user.id === userId
								? socket.emit('message', {
										sender: 'noghte-bazi',
										content: message.default.end.loser,
								  })
								: socket.broadcast.to(roomId).emit('message', {
										sender: 'noghte-bazi',
										content: message.default.end.loser,
								  })
					}
				}
			}
		}
	})
	socket.on('gift', (userId: string, roomId: string) => {
		const room = findRoomById(roomId)
		const user = findUserById(userId, roomId)
		console.log('new gift request arrived by user id:', userId)

		if (check(room, user, 'gift')) io.to(room.id).emit('gift')
		else socket.emit('warning', 'warning')
	})

	socket.on('resign', (userId: string, roomId: string) => {
		const room = findRoomById(roomId)
		const user = findUserById(userId, roomId)
		room.isEnded = true
		user.isConnected = false
		socket.broadcast.to(room.id).emit('resign', 'salam')
	})

	socket.on('getname', (roomId: string) => {
		const room = findRoomById(roomId)
		let redName: string, blueName: string
		for (let i = 0; i < room.userIds.length; i++) {
			const user = findUserById(room.userIds[i], roomId)
			if (user.color === 'red') redName = user.name
			else blueName = user.name
		}
		socket.emit('getname', redName, blueName)
	})

	socket.on('message', (roomId: string, userId: string, message: string) => {
		const room = findRoomById(roomId)
		room.messages.push({ sender: userId, content: message })
		socket.broadcast
			.to(room.id)
			.emit('message', { sender: userId, content: message })
	})
})
io.adapter(createAdapter(pool))
server.listen(config.server.port, () =>
	console.log(`server is listening on port ${config.server.port}`),
)
