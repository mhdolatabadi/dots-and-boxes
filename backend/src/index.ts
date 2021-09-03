import * as express from 'express'
import * as http from 'http'

import './setup/mongodb.js'

import { message } from './helper/localization/'
import { config } from './setup/config'
import { Server } from 'socket.io'
import { createUserById, getUserByUserId } from './models/user'
import { endPaper, updatePaper } from './models/paper.js'
import { updatePlayer, updateScore } from './models/player.js'
import { createMessage } from './models/message.js'
import { createLine } from './models/line.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
	cors: {
		origin: config.server.origin,
		methods: ['GET', 'POST'],
	},
})

const papers: paper[] = []
const users: user[] = []

type line = {
	i: number
	j: number
	color: string
}

type message = {}

type user = {
	id: string
	score: number
	paperIds: string[]
	color: string
	hasPermission: boolean
	role: string
	isConnected: boolean
	socketId: string
	name: string
}

type paper = {
	id: string
	userIds: string[]
	subscriberIds?: string[]
	turn: string
	isEnded: boolean
	socketIds: string[]
	lastMove?: line
	history: string[][]
	messages: message[]
	size: number
	winner?: user
}
const createPaper = (
	socketId: string,
	paperSize: number,
	paperId: string,
): paper => {
	const paper = {
		id: paperId,
		userIds: [''],
		turn: 'red',
		isEnded: false,
		socketIds: [socketId],
		messages: [''],
		size: paperSize,
		history: [['']],
	}
	papers.push(paper)
	return paper
}

const createUser = (userId: string, socketId: string): user => {
	const user = {
		id: userId,
		score: 0,
		paperIds: [''],
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

const findPaperById = (paperId: string): paper | undefined =>
	papers.find(paper => paper.id === paperId)
const findUserById = (userId: string, paperId: string): user | undefined =>
	users.find(user => !!(user.id === userId && user.paperIds.includes(paperId)))

const findUserBySocketId = (socketId: string): user | undefined =>
	users.find(user => user.socketId === socketId)
const findPaperBySocketId = (socketId: string): paper | undefined =>
	papers.find(paper => paper.socketIds.includes(socketId))

interface configUserProp {
	color: string
	hasPermission: boolean
	role: string
	isConnected: boolean
	socketId: string
	score: number
}

const configUser = async (
	user: user,
	paper: paper,
	{ color, hasPermission, role, isConnected, socketId, score }: configUserProp,
) => {
	user.paperIds.push(paper.id)
	user.color = color
	user.hasPermission = hasPermission
	user.role = role
	user.isConnected = isConnected
	user.socketId = socketId
	await updatePlayer(
		user.id,
		paper.id,
		color,
		hasPermission,
		role,
		isConnected,
		socketId,
		score,
	)
}
const hostFirstUser = async (paper: paper, user: user, socket: any) => {
	console.log(
		`hosting first user with userId: ${user.id} in paper with paperId: ${paper.id}`,
	)

	configUser(user, paper, {
		color: 'red',
		hasPermission: true,
		role: 'player',
		isConnected: true,
		socketId: socket.id,
		score: user.score,
	})

	paper.turn = 'red'
	paper.userIds.push(user.id)
	paper.socketIds.push(socket.id)

	await updatePaper(
		paper.id,
		user.id,
		socket.id,
		paper.turn,
		paper.size,
		paper.isEnded,
	)

	socket.emit('hasPermission', user.hasPermission)
	socket.emit('watch', paper.history, paper.messages)

	socket.join(paper.id)
	socket.emit('color', 'red')
	socket.emit('score', user.score)

	socket.emit('mustWait', true)
}

const hostSecondUser = async (paper: paper, user: user, socket: any) => {
	console.log(
		`hosting second user with userId: ${user.id} in paper with paperId: ${paper.id}`,
	)

	if (paper.isEnded) {
		const opponentId =
			paper.userIds[1] === user.id ? paper.userIds[2] : paper.userIds[1]
		const opponent = findUserById(opponentId, paper.id)
		socket.emit('color', user.color)
		socket.emit('hasPermission', false)
		socket.emit('watch', paper.history, paper.messages)
		socket.emit('score', user.score)
		io.to(paper.id).emit('mustWait', false)
		socket.emit('name', opponent?.id, opponent?.score, opponent?.color)
	} else {
		const secondUser = findUserById(
			paper.userIds[1] === user.id ? paper.userIds[2] : paper.userIds[1],
			paper.id,
		)
		if (secondUser && secondUser.color === 'red') user.color = 'blue'
		else user.color = 'red'

		await configUser(user, paper, {
			color: user.color,
			hasPermission: false,
			role: 'player',
			isConnected: true,
			socketId: socket.id,
			score: user.score,
		})

		user.hasPermission = paper.turn === user.color
		if (!paper.userIds.includes(user.id)) paper.userIds.push(user.id)
		if (!paper.socketIds.includes(socket.id)) paper.socketIds.push(socket.id)

		await updatePaper(
			paper.id,
			user.id,
			socket.id,
			paper.turn,
			paper.size,
			paper.isEnded,
		)

		socket.emit('color', user.color)
		socket.emit('hasPermission', user.hasPermission)
		socket.emit('watch', paper.history, paper.messages)
		socket.emit('score', user.score)
		socket.join(paper.id)
		io.to(paper.id).emit('mustWait', false)
		io.to(paper.id).emit('introduce', 'hello')
	}
}

const hostSubscriber = (paper: paper, user: user, socket: any) => {
	console.log(
		`hosting subscriber with userId: ${user.id} in paper with paperId: ${paper.id}`,
	)
	configUser(user, paper, {
		color: '',
		hasPermission: false,
		role: 'subscriber',
		isConnected: true,
		socketId: socket.id,
		score: -1,
	})
	paper.subscriberIds.push(user.id)
	socket.join(paper.id)
	socket.emit('role', 'subscriber', paper.turn)
	socket.emit('watch', paper.history, paper.messages)
}

const directUserToPaper = async (
	paperId: string,
	userId: string,
	socket: any,
	paperSize: number,
) => {
	const paper =
		findPaperById(paperId) || createPaper(socket.id, paperSize, paperId)
	const user = findUserById(userId, paperId) || createUser(userId, socket.id)

	const dbUser =
		(await getUserByUserId(userId)) || (await createUserById(userId, '', '', 0))

	if (checkMultipleDeviceEntry(paper, user, userId, paperId)) {
		socket.emit('warning', 'multiple device')
		socket.disconnect(true)
	} else {
		switch (paper.userIds.length) {
			case 1:
				await hostFirstUser(paper, user, socket)
				break
			case 2:
				await hostSecondUser(paper, user, socket)
				break
			default:
				if (!!findUserById(userId, paperId)) hostSecondUser(paper, user, socket)
				else hostSubscriber(paper, user, socket)
				break
		}
	}
}

const checkMultipleDeviceEntry = (
	paper: paper,
	user: user,
	userId: string,
	paperId: string,
) =>
	(paper.userIds.includes(user.id) && user.isConnected === true) ||
	!userId ||
	!paperId

const checkValidation = (paper: paper, user: user, type: string): boolean => {
	const result =
		user &&
		paper &&
		user.isConnected &&
		!paper.isEnded &&
		user.role === 'player'
	if (type === 'change')
		return user.hasPermission && paper.turn === user.color && result
	else return !user.hasPermission && paper.turn !== user.color && result
}

const changeTurn = (paper: paper, userId: string): boolean => {
	if (paper && paper.turn === 'red') paper.turn = 'blue'
	else if (paper && paper.turn === 'blue') paper.turn = 'red'
	for (let i = 0; i < paper.userIds.length; i++) {
		const user = findUserById(paper.userIds[i], paper.id)
		if (user) user.hasPermission = user?.id !== userId
	}
	return true
}
const check = (paper: paper, user: user, type: string): boolean => {
	if (checkValidation(paper, user, type)) return changeTurn(paper, user.id)
	return false
}

const getUserAndPaper = (paperId: string, userId: string) => {
	const paper = findPaperById(paperId)
	const user = findUserById(userId, paperId)
	return { paper, user }
}

interface handshakeProps {
	roomId: string
	userId: string
	paperSize: number
}

io.on('connection', socket => {
	socket.emit('handshake', 'welcome! give me your paper id!')
	socket.on(
		'handshake',
		async ({ roomId: paperId, userId, paperSize }: handshakeProps) =>
			await directUserToPaper(paperId, userId, socket, paperSize),
	)

	socket.on('introduce', async (userId: string, paperId: string) => {
		const user = findUserById(userId, paperId)
		const content = message.default.welcome
		socket.broadcast.to(paperId).emit('name', userId, user?.score, user?.color)
		socket.emit('message', {
			sender: 'noghte-bazi',
			content,
		})
		await createMessage(userId, paperId, content)
	})

	socket.on('disconnect', () => {
		const user = findUserBySocketId(socket.id)
		const paper = findPaperBySocketId(socket.id)
		if (user) user.isConnected = false
		if (user && user.role === 'player')
			socket.broadcast.to(paper?.id).emit('mustWait', true)
	})

	socket.on('change', async (userId: string, paperId: string, line: line) => {
		const { paper, user } = getUserAndPaper(userId, paperId)
		if (!paper || !user) return

		if (check(paper, user, 'change')) {
			const { i, j, color } = line
			line.color = user?.color
			paper.lastMove = line
			paper.history[i] = { ...paper.history[i] }
			paper.history[i][j] = color
			socket.broadcast.to(paper.id).emit('change', line, color)
			await createLine(paperId, i, j, color)
		} else socket.emit('warning', 'warning')
	})

	socket.on('bouns', (paperId: string, userId: string, bonus: line) => {
		const { paper, user } = getUserAndPaper(userId, paperId)
		if (!paper || !user) return

		if (user && user.color === bonus.color) {
			const { i, j, color } = bonus
			if (!paper.history[i] || !paper.history[i][j]) {
				paper.history[i] = { ...paper.history[i] }
				paper.history[i][j] = color
				user.score += 1

				// sending gift!
				paper.turn = user.color
				let sumOfScores = 0
				for (let i = 0; i < paper.userIds.length; i++) {
					const user = findUserById(paper.userIds[i], paper.id)
					if (!user) continue
					sumOfScores += user.score
					user.hasPermission = user.id === userId
				}
				io.to(paperId).emit('gift', userId)

				if (sumOfScores === (paper.size - 1) * (paper.size - 1)) {
					paper.isEnded = true
					endPaper(paperId)
					updateScore(userId, paperId, user.score)

					paper.userIds.map(userId => {
						const user = findUserById(userId, paper.id)
						if (!user) return
					})

					for (let i = 0; i < paper.userIds.length; i++) {
						const user = findUserById(paper.userIds[i], paper.id)
						if (!user) continue

						const sender = 'noghte-bazi'
						if (user.id === userId) {
							const content =
								user.score > sumOfScores - user.score
									? message.default.end.winner
									: message.default.end.loser
							socket.emit('message', {
								sender,
								content,
							})
							createMessage('noghte-bazi', paperId, content)
						} else {
							const content =
								user.score > sumOfScores - user.score
									? message.default.end.loser
									: message.default.end.winner

							socket.broadcast.to(paperId).emit('message', {
								sender,
								content,
							})
							createMessage('noghte-bazi', paperId, content)
						}
					}
				}
			}
		}
	})
	socket.on('gift', (userId: string, paperId: string) => {
		const { paper, user } = getUserAndPaper(userId, paperId)
		if (!paper || !user) return
		if (check(paper, user, 'gift')) io.to(paper.id).emit('gift')
		else socket.emit('warning', 'warning')
	})

	socket.on('resign', (userId: string, paperId: string) => {
		const { paper, user } = getUserAndPaper(userId, paperId)
		if (!paper || !user) return

		paper.isEnded = true
		user.isConnected = false
		socket.broadcast.to(paper.id).emit('resign', 'hello')
	})

	socket.on('name', (paperId: string) => {
		const paper = findPaperById(paperId)
		if (!paper) return
		let redName: string = '',
			blueName: string = ''
		for (let i = 0; i < paper.userIds.length; i++) {
			const user = findUserById(paper.userIds[i], paperId)
			if (!user) continue
			if (user.color === 'red') redName = user.name
			else blueName = user.name
		}
		socket.emit('name', redName, blueName)
	})

	socket.on(
		'message',
		async (paperId: string, userId: string, message: string) => {
			const paper = findPaperById(paperId)
			if (!paper) return

			await createMessage(userId, paperId, message)

			paper.messages.push({ sender: userId, content: message })
			socket.broadcast
				.to(paper.id)
				.emit('message', { sender: userId, content: message })
		},
	)
})
server.listen(config.server.port, () =>
	console.log(` > server is listening on port ${config.server.port}`),
)
