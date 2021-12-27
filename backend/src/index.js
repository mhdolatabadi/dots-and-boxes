const app = require('express')()
const http = require('http').createServer(app)

const { createAdapter } = require('@socket.io/postgres-adapter')
const { saveGame } = require('./db/game.db')
const { saveHistory } = require('./db/history.db')
const { saveMessage } = require('./db/message.db')
const { savePlayer } = require('./db/player.db')
const { savePlays } = require('./db/plays.db')

const message = require('./localization/messages')
const config = require('./setup/config')

const io = require('socket.io')(http, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
})

//migration
const papers = []
const users = []

const createPaper = (socketId, paperSize, paperId) => {
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
	saveGame(paperId, 'red', paperSize)
	papers.push(paper)
	return paper
}

const createUser = (userId, socketId, name) => {
	const user = {
		id: userId,
		score: 0,
		paperIds: [''],
		color: '',
		hasPermission: false,
		role: '',
		isConnected: false,
		socketId,
		name,
	}
	users.push(user)
	savePlayer(userId, name.split('$')[0], name.split('$')[1])
	return user
}

const findPaperById = paperId => papers.find(paper => paper.id === paperId)
const findUserById = (userId, paperId) =>
	users.find(user => !!(user.id === userId && user.paperIds.includes(paperId)))

const findUserBySocketId = socketId =>
	users.find(user => user.socketId === socketId)
const findPaperBySocketId = socketId =>
	papers.find(paper => paper.socketIds.includes(socketId))

const configUser = (
	user,
	paper,
	{ color, hasPermission, role, isConnected, socketId, score },
) => {
	user.paperIds.push(paper.id)
	user.color = color
	user.hasPermission = hasPermission
	user.role = role
	user.isConnected = isConnected
	user.socketId = socketId
}
const hostFirstUser = async (paper, user, socket) => {
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

	savePlays(0, false, 'red', 'player', paper.id, user.id)

	socket.emit('hasPermission', user.hasPermission)
	socket.emit('watch', paper.history, paper.messages)

	socket.join(paper.id)
	socket.emit('color', 'red')
	socket.emit('score', user.score)

	socket.emit('mustWait', true)
}

const hostSecondUser = async (paper, user, socket) => {
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

		configUser(user, paper, {
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

		savePlays(user.score, false, user.color, user.role, paper.id, user.id)

		socket.emit('color', user.color)
		socket.emit('hasPermission', user.hasPermission)
		socket.emit('watch', paper.history, paper.messages)
		socket.emit('score', user.score)
		socket.join(paper.id)
		io.to(paper.id).emit('mustWait', false)
		io.to(paper.id).emit('introduce', 'hello')
	}
}

const hostSubscriber = (paper, user, socket) => {
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
	savePlays(-1, false, red, 'subscriber', paper.id, user.id)

	socket.join(paper.id)
	socket.emit('role', 'subscriber', paper.turn)
	socket.emit('watch', paper.history, paper.messages)
}

const directUserToPaper = (paperId, userId, socket, paperSize, name) => {
	const paper =
		findPaperById(paperId) || createPaper(socket.id, paperSize, paperId)
	const user =
		findUserById(userId, paperId) || createUser(userId, socket.id, name)

	if (checkMultipleDeviceEntry(paper, user, userId, paperId)) {
		socket.emit('warning', 'multiple device')
		socket.disconnect(true)
	} else {
		switch (paper.userIds.length) {
			case 1:
				hostFirstUser(paper, user, socket)
				break
			case 2:
				hostSecondUser(paper, user, socket)
				break
			default:
				if (!!findUserById(userId, paperId)) hostSecondUser(paper, user, socket)
				else hostSubscriber(paper, user, socket)
				break
		}
	}
}

const checkMultipleDeviceEntry = (paper, user, userId, paperId) =>
	(paper.userIds.includes(user.id) && user.isConnected === true) ||
	!userId ||
	!paperId

const checkValidation = (paper, user, type) => {
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

const changeTurn = (paper, userId) => {
	if (paper && paper.turn === 'red') paper.turn = 'blue'
	else if (paper && paper.turn === 'blue') paper.turn = 'red'
	for (let i = 0; i < paper.userIds.length; i++) {
		const user = findUserById(paper.userIds[i], paper.id)
		if (user) user.hasPermission = user?.id !== userId
	}
	return true
}
const check = (paper, user, type) => {
	if (checkValidation(paper, user, type)) return changeTurn(paper, user.id)
	return false
}

const getUserAndPaper = (paperId, userId) => {
	const paper = findPaperById(paperId)
	const user = findUserById(userId, paperId)
	return { paper, user }
}

io.on('connection', socket => {
	socket.emit('handshake', 'welcome! give me your paper id!')
	socket.on('handshake', ({ roomId: paperId, userId, paperSize, name }) =>
		directUserToPaper(paperId, userId, socket, paperSize, name),
	)

	socket.on('introduce', (userId, paperId) => {
		const user = findUserById(userId, paperId)
		const content = message.welcome
		socket.broadcast.to(paperId).emit('name', userId, user?.score, user?.color)
		socket.emit('message', {
			sender: 'noghte-bazi',
			content,
		})
	})

	socket.on('disconnect', () => {
		const user = findUserBySocketId(socket.id)
		const paper = findPaperBySocketId(socket.id)
		if (user) user.isConnected = false
		if (user && user.role === 'player')
			socket.broadcast.to(paper?.id).emit('mustWait', true)
	})

	socket.on('change', (userId, paperId, line) => {
		const { paper, user } = getUserAndPaper(userId, paperId)
		if (!paper || !user) return

		if (check(paper, user, 'change')) {
			const { i, j, color } = line
			if (color) {
				line.color = user?.color
				paper.lastMove = line
				paper.history[i] = { ...paper.history[i] }
				paper.history[i][j] = color
				saveHistory(i, j, userId, paperId)

				socket.broadcast.to(paper.id).emit('change', line, color)
			} else {
				socket.broadcast.to(paper.id).emit('skip', 'opponent timeout')
			}
		} else socket.emit('warning', 'warning')
	})

	socket.on('bouns', (paperId, userId, bonus) => {
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

					for (let i = 0; i < paper.userIds.length; i++) {
						const user = findUserById(paper.userIds[i], paper.id)
						if (!user) continue

						const sender = 'noghte-bazi'
						const isWinner = user.score > sumOfScores - user.score
						if (user.id === userId) {
							const content = isWinner
								? message.default.end.winner
								: message.default.end.loser
							socket.emit('message', { sender, content })
						} else {
							const content = isWinner
								? message.default.end.loser
								: message.default.end.winner
							socket.broadcast.to(paperId).emit('message', { sender, content })
						}
					}
				}
			}
		}
	})
	socket.on('gift', (userId, paperId) => {
		const { paper, user } = getUserAndPaper(userId, paperId)
		if (!paper || !user) return
		if (check(paper, user, 'gift')) io.to(paper.id).emit('gift')
		else socket.emit('warning', 'warning')
	})

	socket.on('resign', (userId, paperId) => {
		const { paper, user } = getUserAndPaper(userId, paperId)
		if (!paper || !user) return

		paper.isEnded = true
		user.isConnected = false
		socket.broadcast.to(paper.id).emit('resign', 'hello')
	})

	socket.on('name', paperId => {
		const paper = findPaperById(paperId)
		if (!paper) return
		let redName = '',
			blueName = ''
		for (let i = 0; i < paper.userIds.length; i++) {
			const user = findUserById(paper.userIds[i], paperId)
			if (!user) continue
			if (user.color === 'red') redName = user.name
			else blueName = user.name
		}
		socket.emit('name', redName, blueName)
	})

	socket.on('message', async (paperId, userId, message) => {
		const paper = findPaperById(paperId)
		if (!paper) return

		paper.messages.push({ sender: userId, content: message })
		saveMessage(message, userId, paperId)

		socket.broadcast
			.to(paper.id)
			.emit('message', { sender: userId, content: message })
	})
})
io.adapter(createAdapter(pool))
io.listen(config.server.port, () =>
	console.log(` > server is listening on port ${config.server.port}`),
)
