const { findUserById } = require('../store/users')

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
    user.hasPermission = user.id !== userId
  }
  return true
}

// Validates the requesting user is allowed to make this move (per `type`,
// e.g. 'change' or 'gift'), and if so, advances the turn.
const check = (room, user, type) => {
  if (checkValidation(room, user, type)) return changeTurn(room, user.id)
  return false
}

module.exports = { check }
