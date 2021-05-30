const app = require('express')()
const http = require('http').createServer(app)
const config = require('./src/setup/config')
const io = require('socket.io')(http, {
  cors: {
    origin: config.server.origin,
    methods: ['GET', 'POST'],
  },
})
const rooms = []
const users = []
const createRoom = (roomId, socketId, paperSize) => {
  const room = {
    id: roomId,
    userIds: [],
    subscriberIds: [],
    history: {},
    turn: 'red',
    isEnded: false,
    socketIds: [socketId],
    lastMove: {},
    messages: [],
    size: paperSize,
    winner: undefined,
  }
  rooms.push(room)
  return room
}

const createUser = (userId, socketId) => {
  const user = {
    id: userId,
    score: 0,
    roomIds: [],
    color: '',
    hasPermission: false,
    role: '',
    connection: false,
    socketId,
  }
  users.push(user)
  return user
}

// const getUserById = id =>

const findRoomById = (roomId) => rooms.find((room) => room.id === roomId)
const findUserById = (userId, roomId) =>
  users.find((user) => {
    const result = !!(user.id === userId && user.roomIds.includes(roomId))
    return result
  })

const findUserBySocketId = (socketId) =>
  users.find((user) => user.socketId === socketId)
const findRoomBySocketId = (socketId) =>
  rooms.find((room) => room.socketIds.includes(socketId))

const configUser = ({
  user,
  room,
  color,
  hasPermission,
  role,
  connection,
  socketId,
}) => {
  user.roomIds.push(room.id)
  user.color = color
  user.hasPermission = hasPermission
  user.role = role
  user.connection = connection
  user.socketId = socketId
}

const configRoom = {}

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
    socket.emit('name', opponent.id, opponent.score, opponent.color)
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

const directUserToRoom = (roomId, userId, socket, paperSize) => {
  const room = findRoomById(roomId) || createRoom(roomId, socket.id, paperSize)
  const user = findUserById(userId, roomId) || createUser(userId, socket.id)
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
        if (!!findUserById(userId, roomId)) hostSecondUser(room, user, socket)
        else hostSubscriber(room, user, socket)
        break
    }
  }
}

const checkValidation = (room, user, type) => {
  const result =
    user && room && user.connection && !room.end && user.role === 'player'
  if (type === 'change') {
    console.log(
      `check validation user id: ${user.id} hasPermission is: ${user.hasPermission}`
    )
    return user.hasPermission && room.turn === user.color && result
  } else {
    console.log(
      `check validation user id: ${user.id}`,
      !user.hasPermission,
      room.turn !== user.color,
      result
    )
    return !user.hasPermission && room.turn !== user.color && result
  }
}

const changeTurn = (room, userId) => {
  if (room && room.turn === 'red') room.turn = 'blue'
  else if (room && room.turn === 'blue') room.turn = 'red'
  for (let i = 0; i < room.userIds.length; i++) {
    const user = findUserById(room.userIds[i], room.id)
    if (user.id === userId) user.hasPermission = false
    else user.hasPermission = true
  }
  return true
}
const check = (room, user, type) => {
  if (checkValidation(room, user, type)) return changeTurn(room, user.id)
  return false
}

io.on('connection', (socket) => {
  socket.emit('handshake', 'welcome! give me your room id!')
  socket.on('handshake', (input) => {
    const { roomId, userId, paperSize } = input
    const room = findRoomById(roomId)
    const user = findUserById(userId, roomId)
    directUserToRoom(roomId, userId, socket, paperSize)
  })
  socket.on('introduce', (userId, roomId) => {
    const user = findUserById(userId, roomId)
    socket.broadcast.to(roomId).emit('name', userId, user.score, user.color)
    socket.emit('message', {
      sender: 'noghte-bazi',
      content:
        'سلام. امیدوارم حالت خوب باشه. با ضربه‌زدن روی هر خط میتونی اون خط رو مال خودت کنی فقط حواست به نوبتت باشه. پس منتظر چی هستی؟ زودتر شروع کن!',
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
      // room.userIds.splice(room.userIds.indexOf(user.id), 1)
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
  socket.on('bouns', (roomId, userId, bouns) => {
    const room = findRoomById(roomId)
    const user = findUserById(userId, roomId)
    if (user && user.color === bouns.color) {
      const { i, j, color } = bouns
      if (room.history[i] && room.history[i][j]) {
      } else {
        console.log(`new bouns arrived:`, bouns, `from user:`, user.id)
        room.history[i] = { ...room.history[i] }
        room.history[i][j] = color
        user.score += 1

        // sending gift!
        if (room) room.turn = user.color
        let sumOfScores = 0
        for (let i = 0; i < room.userIds.length; i++) {
          const user = findUserById(room.userIds[i], room.id)
          sumOfScores += user.score
          if (user.id === userId) user.hasPermission = true
          else user.hasPermission = false
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
                  content:
                    'آفرین! تو بازیو بردی. به افتخار بردت بازیو به رنگی که تو باهاش بازی کردی زدیم. فقط شیرینی یادت نره!',
                })
              else
                socket.broadcast.to(roomId).emit('message', {
                  sender: 'noghte-bazi',
                  content:
                    'آفرین! تو بازیو بردی. به افتخار بردت بازیو به رنگی که تو باهاش بازی کردی زدیم. فقط شیرینی یادت نره!',
                })
            } else {
              if (user.id === userId)
                socket.emit('message', {
                  sender: 'noghte-bazi',
                  content:
                    'بازیو باختی ولی اشکالی نداره اول ازش شیرینی بردشو بگیر بعدش یه بار دیگه نقطه بازیو بفرست تا این دفعه بهش نشون بدی کی بلده بازی کنه...',
                })
              else
                socket.broadcast.to(roomId).emit('message', {
                  sender: 'noghte-bazi',
                  content:
                    'بازیو باختی ولی اشکالی نداره اول ازش شیرینی بردشو بگیر بعدش یه بار دیگه نقطه بازیو بفرست تا این دفعه بهش نشون بدی کی بلده بازی کنه...',
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
http.listen(config.server.port, () => {})
