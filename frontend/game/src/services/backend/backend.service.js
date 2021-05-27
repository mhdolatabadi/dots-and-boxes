// import { axios } from 'axios'
import { io } from 'socket.io-client'
import {
  dispatchAddNewLine,
  dispatchAddNewMessage,
  dispatchHasPermission,
  dispatchIsWaiting,
  dispatchOpponentId,
  dispatchPlayerColor,
  dispatchSetHistory,
  dispatchSetMessages,
  dispatchSetOpponentLastMove,
  dispatchSetRoomLastMove,
  dispatchSetStatus,
  getPlayerColor,
  getPlayerHasPermission,
  getPlayerId,
  getPlayerName,
  getRoomId,
} from '../../scenes/_slice/game.slice'

import { HTTP_BACKEND } from '../../setup/api'
import { dispatch } from '../../setup/store/store'
import { getCurrentUserId, getWisId } from '../weblite/weblite.api'
// /**
//  * @param {Object} params - your passed data
//  * @return {Promise<unknown>}
//  */
// export const getBackend = params =>
//   axios.get('api-path', { params }).then(res => res.data)
const socket = io(HTTP_BACKEND)

const roomId = getRoomId()
const playerId = getPlayerId()
const playerName = getPlayerName()
const playerColor = getPlayerColor()

socket.on('connect', () => {
  console.log('connected')
  dispatchSetStatus('connected')
})

socket.on('handshake', () => {
  console.log('handshaking...')

  socket.emit('handshake', { roomId: getWisId(), userId: getCurrentUserId() })
})

socket.on('color', color => {
  console.log('getting color...', color)
  dispatchPlayerColor(color)
})

socket.on('mustWait', type => {
  console.log('waiting...')
  console.log(type)
  // W.messages.sendMessageToCurrentChat('text', 'نقطه بازی کنیم؟')
  dispatchIsWaiting(type)
  type ? dispatchSetStatus('waiting') : dispatchSetStatus('connected')
})

socket.on('watch', (history, messages) => {
  console.log('wathcing history...')
  console.log(history)
  dispatchSetHistory(history)
  dispatchSetMessages(messages)
  // if (history.length > 0) {
  //   for (let i = 0; i < history.length; i++) {
  //     recieve(history[i], history[i].color)
  //   }
  // }
})

socket.on('introduce', () => {
  console.log('introducing...')
  socket.emit('introduce', playerId, roomId)
})

socket.on('name', opponentId => {
  console.log('getting opponent name')
  dispatchOpponentId(opponentId)
})

socket.on('role', (role, color) => {
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
  const sendAudio = new Audio('./assets/what-302.mp3')
  sendAudio.play()
})

socket.on('change', (line, color) => {
  // if (get('role') === 'subscriber') {
  //   set('opponentColor', turn)
  //   if (turn === 'red') set('color', 'blue')
  //   else set('color', 'red')
  // }
  console.log(color)
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
  console.log(`permission changed to ${playerId === userId}`)
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
  const roomId = getRoomId()
  const playerId = getPlayerId()
  const message = { i, j, color }
  socket.emit('change', playerId, roomId, message)
  dispatchHasPermission(false)
}

export const sendBouns = (i, j, color) => {
  const roomId = getRoomId()
  const userId = getPlayerId()
  const bouns = { i, j, color }
  socket.emit('bouns', roomId, userId, bouns)
}

export const sendMessage = message => {
  const roomId = getRoomId()
  const userId = getPlayerId()

  socket.emit('message', roomId, userId, message)
}

export const resign = () => {
  // showEnd(get('opponentColor'))
  // socket.emit('resign', get('userId'), get('roomId'))
}
