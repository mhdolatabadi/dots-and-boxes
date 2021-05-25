const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})
const config = require('./src/setup/config')
const rooms = []
const users = []
const createRoom = (roomId, socketId) => {
  const room = {
    id: roomId,
    userIds: [],
    subscriberIds: [],
    history: [],
    turn: 'red',
    isEnded: false,
    socketIds: [socketId],
  }
  rooms.push(room)
  return room
}

const createUser = (userId, socketId) => {
  const user = {
    id: userId,
    score: '',
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
  socket.join(room.id)
  socket.emit('color', 'red')
  socket.emit('mustWait', true)
}

const hostSecondUser = (room, user, socket) => {
  console.log(
    `hosting second user with userId: ${user.id} in room with roomId: ${room.id}`
  )

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
  socket.emit('watch', room.history)
  socket.join(room.id)
  io.to(room.id).emit('mustWait', false)
  io.to(room.id).emit('introduce', 'hello')
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
  socket.emit('watch', room.history)
}

const directUserToRoom = (roomId, userId, socket) => {
  const room = findRoomById(roomId) || createRoom(roomId, socket.id)
  const user = findUserById(userId, roomId) || createUser(userId, socket.id)
  if (room.userIds.includes(user.id)) {
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
  const result = user.connection && !room.end && user.role === 'player'
  if (type === 'change')
    return user.hasPermission && room.turn === user.color && result
  else return !user.hasPermission && room.turn !== user.color && result
}

const changeTurn = (room) => {
  if (room.turn === 'red') room.turn = 'blue'
  else if (room.turn === 'blue') room.turn = 'red'
  for (let i = 0; i < room.userIds.length; i++)
    findUserById(room.userIds[i], room.id).hasPermission = !findUserById(
      room.userIds[i],
      room.id
    ).hasPermission
  return true
}
const check = (room, user, type) => {
  if (checkValidation(room, user, type)) return changeTurn(room)
  return false
}

io.on('connection', (socket) => {
  socket.emit('handshake', 'welcome! give me your room id!')
  socket.on('handshake', (input) => {
    const { roomId, userId } = input
    directUserToRoom(roomId, userId, socket)
  })
  socket.on('introduce', (userId, roomId) =>
    socket.broadcast.to(roomId).emit('name', userId)
  )
  socket.on('disconnect', () => {
    console.log(`user with socket id ${socket.id} disconnected`)
    const user = findUserBySocketId(socket.id)
    const room = findRoomBySocketId(socket.id)
    user.connection = false
    if (user.role === 'player') {
      room.userIds.pop(user.id)
      socket.broadcast.to(room.id).emit('mustWait', true)
    }
  })
  socket.on('change', (userId, roomId, line) => {
    const room = findRoomById(roomId)
    const user = findUserById(userId, roomId)
    console.log('new line arrived: ', line)
    console.log(roomId, userId)
    if (check(room, user, 'change')) {
      line.color = user.color
      room.history.push(line)
      socket.broadcast.to(room.id).emit('change', line, user.color)
    } else socket.emit('warning', 'warning')
  })
  socket.on('gift', (userId, roomId) => {
    const room = findRoomById(roomId)
    const user = findUserById(userId, roomId)
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

  socket.on('message', (roomId, message) => {
    const room = findRoomById(roomId)
    socket.broadcast.to(room.id).emit('message', message)
  })
})
http.listen(config.server.port, () => {})
