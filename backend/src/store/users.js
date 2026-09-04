const users = new Map()

const createUser = (userId, socketId, name) => {
  const user = {
    id: userId,
    name,
    score: 0,
    roomIds: [],
    color: '',
    hasPermission: false,
    role: '',
    connection: false,
    socketId,
  }
  users.set(userId, user)
  return user
}

// A user is only considered part of a room once they've actually joined it
// (roomIds), even though lookups are keyed by their global id.
const findUserById = (userId, roomId) => {
  const user = users.get(userId)
  return user && user.roomIds.includes(roomId) ? user : undefined
}

const findUserBySocketId = (socketId) => {
  for (const user of users.values()) {
    if (user.socketId === socketId) return user
  }
  return undefined
}

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

module.exports = { createUser, findUserById, findUserBySocketId, configUser }
