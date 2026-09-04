const { findRoomById, findRoomBySocketId } = require('../store/rooms')
const { findUserById, findUserBySocketId } = require('../store/users')
const { createRoomDirector } = require('../game/matchmaking')
const { check } = require('../game/turns')
const {
  WELCOME_MESSAGE,
  WIN_MESSAGE,
  LOSE_MESSAGE,
} = require('../game/messages')

const registerSocketHandlers = (io) => {
  const { directUserToRoom } = createRoomDirector(io)

  io.on('connection', (socket) => {
    socket.emit('handshake', 'welcome! give me your room id!')

    socket.on('handshake', (input) => {
      const { roomId, userId, paperSize, name } = input
      directUserToRoom(roomId, userId, name, socket, paperSize)
    })

    socket.on('introduce', (userId, roomId) => {
      const user = findUserById(userId, roomId)
      socket.broadcast
        .to(roomId)
        .emit('name', userId, user.score, user.color, user.name)
      socket.emit('message', {
        sender: 'noghte-bazi',
        content: WELCOME_MESSAGE,
      })
    })

    socket.on('disconnect', () => {
      const user = findUserBySocketId(socket.id)
      const room = findRoomBySocketId(socket.id)
      console.log(
        `user with ${user ? 'user' : 'socket'}id ${
          user ? user.id : socket.id
        } disconnected`
      )
      if (user) user.connection = false
      if (user && user.role === 'player') {
        socket.broadcast.to(room.id).emit('mustWait', true)
      }
    })

    socket.on('change', (userId, roomId, line) => {
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

    socket.on('bonus', (roomId, userId, bonus) => {
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
            user.hasPermission = user.id === userId
          }
          io.to(roomId).emit('gift', userId)
          console.log(sumOfScores, room.size)

          if (sumOfScores === (room.size - 1) * (room.size - 1)) {
            room.isEnded = true
            console.log(user.score)
            for (let i = 0; i < room.userIds.length; i++) {
              const user = findUserById(room.userIds[i], room.id)
              console.log(sumOfScores, user.score)
              if (user.score > sumOfScores - user.score) {
                if (user.id === userId)
                  socket.emit('message', {
                    sender: 'noghte-bazi',
                    content: WIN_MESSAGE,
                  })
                else
                  socket.broadcast.to(roomId).emit('message', {
                    sender: 'noghte-bazi',
                    content: WIN_MESSAGE,
                  })
              } else {
                if (user.id === userId)
                  socket.emit('message', {
                    sender: 'noghte-bazi',
                    content: LOSE_MESSAGE,
                  })
                else
                  socket.broadcast.to(roomId).emit('message', {
                    sender: 'noghte-bazi',
                    content: LOSE_MESSAGE,
                  })
              }
            }
          }
        }
      }
    })

    socket.on('gift', (userId, roomId) => {
      const room = findRoomById(roomId)
      const user = findUserById(userId, roomId)
      console.log('new gift request arrived by user id:', userId)

      if (check(room, user, 'gift')) io.to(room.id).emit('gift')
      else socket.emit('warning', 'warning')
    })

    socket.on('resign', (userId, roomId) => {
      const room = findRoomById(roomId)
      const user = findUserById(userId, roomId)
      room.end = true
      user.connection = false
      socket.broadcast.to(room.id).emit('resign', 'salam')
    })

    socket.on('getname', (roomId) => {
      const room = findRoomById(roomId)
      let redName, blueName
      for (let i = 0; i < room.userIds.length; i++) {
        const element = room.userIds[i]
        if (element.color === 'red') redName = element.name
        else blueName = element.name
      }
      socket.emit('getname', redName, blueName)
    })

    socket.on('message', (roomId, userId, message) => {
      const room = findRoomById(roomId)
      room.messages.push({ sender: userId, content: message })
      socket.broadcast
        .to(room.id)
        .emit('message', { sender: userId, content: message })
    })
  })
}

module.exports = { registerSocketHandlers }
