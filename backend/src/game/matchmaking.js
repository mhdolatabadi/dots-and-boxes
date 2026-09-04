const { createRoom, findRoomById } = require('../store/rooms')
const { createUser, findUserById, configUser } = require('../store/users')

// Places a connecting user into their room: host of a fresh room, opponent
// joining an existing one, a rejoin after disconnect, or a spectator once
// the room already has its two players. Needs `io` to broadcast room-wide
// events (e.g. telling both players the wait is over).
const createRoomDirector = (io) => {
  const hostFirstUser = (room, user, socket) => {
    console.log(
      `hosting first user with userId: ${user.id} in room with roomId: ${room.id}`
    )

    configUser({
      user,
      room,
      color: 'red',
      hasPermission: true,
      role: 'player',
      connection: true,
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

  const hostSecondUser = (room, user, socket) => {
    console.log(
      `hosting second user with userId: ${user.id} in room with roomId: ${room.id}`
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
      socket.emit(
        'name',
        opponent.id,
        opponent.score,
        opponent.color,
        opponent.name
      )
    } else {
      configUser({
        user,
        room,
        color: undefined,
        hasPermission: false,
        role: 'player',
        connection: true,
        socketId: socket.id,
      })
      const secondUser = findUserById(
        room.userIds[0] === user.id ? room.userIds[1] : room.userIds[0],
        room.id
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

  const hostSubscriber = (room, user, socket) => {
    console.log(
      `hosting subscriber with userId: ${user.id} in room with roomId: ${room.id}`
    )
    configUser({
      user,
      room,
      color: undefined,
      hasPermission: false,
      role: 'subscriber',
      connection: true,
      socketId: socket.id,
    })
    room.subscriberIds.push(user.id)
    socket.join(room.id)
    socket.emit('role', 'subscriber', room.turn)
    socket.emit('watch', room.history, room.messages)
  }

  const directUserToRoom = (roomId, userId, name, socket, paperSize) => {
    const room =
      findRoomById(roomId) || createRoom(roomId, socket.id, paperSize)
    const user =
      findUserById(userId, roomId) || createUser(userId, socket.id, name)
    if (name) user.name = name
    if (
      (room.userIds.includes(user.id) && user.connection === true) ||
      !userId ||
      !roomId
    ) {
      console.log('direct to room', room, user)
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
          if (findUserById(userId, roomId)) hostSecondUser(room, user, socket)
          else hostSubscriber(room, user, socket)
          break
      }
    }
  }

  return { directUserToRoom }
}

module.exports = { createRoomDirector }
