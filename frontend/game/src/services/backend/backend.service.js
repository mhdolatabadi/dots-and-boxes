// import { axios } from 'axios'
import { io } from 'socket.io-client'
import {
  dispatchAddNewLine,
  dispatchAddNewMessage,
  dispatchHasPermission,
  dispatchIsWaiting,
  dispatchOpponentColor,
  dispatchOpponentId,
  dispatchOpponentName,
  dispatchOpponentScore,
  dispatchPlayerColor,
  dispatchPlayerScore,
  dispatchSetHistory,
  dispatchSetMessages,
  dispatchSetOpponentLastMove,
  dispatchSetRoomLastMove,
  dispatchSetStatus,
  getGameMode,
  getPaperSize,
  getPlayerColor,
  getPlayerId,
  getRoomId,
} from '../../scenes/_slice/game.slice'

import { HTTP_BACKEND } from '../../setup/api'
import { getCurrentUserId, getUserFirstName, getWisId } from '../weblite/weblite.api'
// /**
//  * @param {Object} params - your passed data
//  * @return {Promise<unknown>}
//  */
// export const getBackend = params =>
//   axios.get('api-path', { params }).then(res => res.data)
const socket = io(HTTP_BACKEND)

socket.on('connect', () => {
  console.log('connected')
  dispatchSetStatus('connected')
})

// The server only sends its 'handshake' invite once per connection --
// which happens as soon as this module loads, before the player has
// necessarily chosen "online" from the home menu yet. So this can't
// just be answered inline in the listener below: joinOnlineRoom is
// exported so online.service can call it directly once the player
// actually picks online mode, in case that invite already came and
// went by then.
export const joinOnlineRoom = () => {
  console.log('handshaking...')
  const paperSize = getPaperSize()

  socket.emit('handshake', {
    roomId: getWisId(),
    userId: getCurrentUserId(),
    name: getUserFirstName(),
    paperSize,
  })
}

socket.on('handshake', () => {
  if (getGameMode() === 'online') joinOnlineRoom()
})

socket.on('color', color => {
  console.log('getting color...', color)
  dispatchPlayerColor(color)
})

socket.on('mustWait', type => {
  console.log('waiting...')
  // W.messages.sendMessageToCurrentChat('text', 'نقطه بازی کنیم؟')
  dispatchIsWaiting(type)
  type ? dispatchSetStatus('waiting') : dispatchSetStatus('connected')
})

socket.on('watch', (history, messages) => {
  console.log('wathcing history...')
  dispatchSetHistory(history)
  dispatchSetMessages(messages)
  // if (history.length > 0) {
  //   for (let i = 0; i < history.length; i++) {
  //     recieve(history[i], history[i].color)
  //   }
  // }
})

socket.on('introduce', () => {
  const playerId = getPlayerId()

  const roomId = getRoomId()

  console.log('introducing...')
  socket.emit('introduce', playerId, roomId)
})

socket.on('score', score => {
  console.log('getting score...')
  dispatchPlayerScore(score)
})

socket.on('name', (opponentId, opponentScore, opponentColor, opponentName) => {
  console.log('getting opponent name')
  dispatchOpponentId(opponentId)
  dispatchOpponentScore(opponentScore)
  dispatchOpponentColor(opponentColor)
  dispatchOpponentName(opponentName || 'حریف')
})

socket.on('role', (role, color) => {
  const roomId = getRoomId()
  const playerColor = getPlayerColor()
  console.log('getting role')
  if (color === playerColor) dispatchHasPermission(true)
  else dispatchHasPermission(false)
  // set('role', role)
  // showMessage('subscriber')
  socket.emit('getname', roomId)
})

socket.on('getname', (redName, blueName) => {
  console.log('getting name...')
  // if (get('role') === 'subscriber') {
  //   set('name', redName)
  //   set('opponentName', blueName)
  // }
})

socket.on('message', message => {
  dispatchAddNewMessage(message)
  const sendAudio = new Audio('received-message.mp3')
  sendAudio.play()
})

socket.on('change', (line, color) => {
  // if (get('role') === 'subscriber') {
  //   set('opponentColor', turn)
  //   if (turn === 'red') set('color', 'blue')
  //   else set('color', 'red')
  // }
  const playerColor = getPlayerColor()
  const sendAudio = new Audio('line.mp3')
  sendAudio.play()
  if (playerColor !== color) {
    const { i, j } = line
    dispatchSetRoomLastMove(i, j, color)
    dispatchSetOpponentLastMove(i, j, color)
    dispatchAddNewLine(i, j, color)
    dispatchHasPermission(true)
  } else {
    console.log('else')
    console.log(line, color)
  }
})

socket.on('gift', userId => {
  const playerId = getPlayerId()
  dispatchHasPermission(playerId === userId)
})

socket.on('resign', () => {
  // showEnd(get('color'))
  // socket.emit('disconnect', get('userId'), get('roomId'))
})
socket.on('hasPermission', permission => {
  dispatchHasPermission(permission)
})

socket.on('warning', warning => {
  console.log(warning)
})

socket.on('disconnect', () => dispatchSetStatus('connecting'))

export const sendNewLine = (i, j, color) => {
  if (getGameMode() === 'online') {
    const roomId = getRoomId()
    const playerId = getPlayerId()
    socket.emit('change', playerId, roomId, { i, j, color })
  }
  dispatchHasPermission(false)
  const sendAudio = new Audio('line.mp3')
  sendAudio.play()
}

export const sendBonus = (i, j, color) => {
  if (getGameMode() === 'online') {
    const roomId = getRoomId()
    const userId = getPlayerId()
    socket.emit('bonus', roomId, userId, { i, j, color })
  } else {
    // No server to grant the bonus turn back -- the client already
    // knows for certain it just completed the box, so grant it directly.
    dispatchHasPermission(true)
  }
}

export const sendMessage = message => {
  const roomId = getRoomId()
  const userId = getPlayerId()
  const sendAudio = new Audio('send-message.mp3')
  sendAudio.play()

  socket.emit('message', roomId, userId, message)
}

export const resign = () => {
  // showEnd(get('opponentColor'))
  // socket.emit('resign', get('userId'), get('roomId'))
}
