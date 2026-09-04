const rooms = new Map()

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
  rooms.set(roomId, room)
  return room
}

const findRoomById = (roomId) => rooms.get(roomId)

const findRoomBySocketId = (socketId) => {
  for (const room of rooms.values()) {
    if (room.socketIds.includes(socketId)) return room
  }
  return undefined
}

module.exports = { createRoom, findRoomById, findRoomBySocketId }
