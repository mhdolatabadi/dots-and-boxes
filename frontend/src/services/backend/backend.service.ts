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
  dispatchOpponentProfileImage,
  dispatchOpponentScore,
  dispatchPlayerColor,
  dispatchPlayerScore,
  dispatchSetHistory,
  dispatchSetMessages,
  dispatchSetOpponentLastMove,
  dispatchSetRoomLastMove,
  dispatchSetStatus,
  getPaperSize,
  getPlayerColor,
  getPlayerId,
  getPlayerName,
  getRoomId,
} from '../../scenes/_slice/game.slice'

import { HTTP_BACKEND } from '../../setup/api'
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

socket.on('handshake', () => {
  console.log('handshaking...')
  const paperSize = getPaperSize()

  socket.emit('handshake', {
    roomId: "roomId",
    userId: "userId",
    paperSize,
    name: getPlayerName(),
  })
})

socket.on('color', (color: string) => {
  console.log('getting color...', color)
  dispatchPlayerColor(color)
})

socket.on('mustWait', (type: boolean) => {
  console.log('waiting...')
  // W.messages.sendMessageToCurrentChat('text', 'نقطه بازی کنیم؟')
  dispatchIsWaiting(type)
  type ? dispatchSetStatus('waiting') : dispatchSetStatus('connected')
})

socket.on('watch', (history, messages) => {
  console.log('watching history...')
  dispatchSetHistory(history)
  dispatchSetMessages(messages)
  // if (history.length > 0) {
  //   for (let i = 0; i < history.length; i++) {
  //     receive(history[i], history[i].color)
  //   }
  // }
})

socket.on('introduce', () => {
  const playerId = getPlayerId()

  const roomId = getRoomId()

  console.log('introducing...')
  socket.emit('introduce', playerId, roomId)
})

socket.on('score', (score: number) => {
  console.log('getting score...')
  dispatchPlayerScore(score)
})

socket.on('name', (opponentId: string, opponentScore: number, opponentColor: string) => {
  console.log('getting opponent name')
  dispatchOpponentId(opponentId)
  dispatchOpponentScore(opponentScore)
  dispatchOpponentColor(opponentColor)
  dispatchOpponentName("opponentName")
  dispatchOpponentProfileImage("oponnentProfileImage")
})

socket.on('role', (role: string, color: string) => {
  const roomId = getRoomId()
  const playerColor = getPlayerColor()
  console.log('getting role')
  if (color === playerColor) dispatchHasPermission(true)
  else dispatchHasPermission(false)
  // set('role', role)
  // showMessage('subscriber')
  socket.emit('name', roomId)
})

socket.on('name', (redName: string, blueName: string) => {
  console.log('getting name...')
  // if (get('role') === 'subscriber') {
  //   set('name', redName)
  //   set('opponentName', blueName)
  // }
})

socket.on('message', (message: string) => {
  dispatchAddNewMessage(message)
  const sendAudio = new Audio('received-message.mp3')
  sendAudio.play()
})

socket.on('change', (line: {i: number, j: number}, color: string) => {
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

socket.on('gift', (userId: string) => {
  const playerId = getPlayerId()
  dispatchHasPermission(playerId === userId)
})

socket.on('resign', () => {
  // showEnd(get('color'))
  // socket.emit('disconnect', get('userId'), get('roomId'))
})
socket.on('hasPermission', (permission: boolean) => {
  dispatchHasPermission(permission)
})

socket.on('warning', (warning: string) => {
  console.log(warning)
})

socket.on('disconnect', () => dispatchSetStatus('connecting'))

export const sendNewLine = (i: number, j: number, color: string) => {
  const roomId = getRoomId()
  const playerId = getPlayerId()
  const message = { i, j, color }
  socket.emit('change', playerId, roomId, message)
  dispatchHasPermission(false)
  const sendAudio = new Audio('line.mp3')
  sendAudio.play()
}

export const sendBouns = (i: number, j: number, color: string) => {
  console.log('>>> here send bouns')
  const roomId = getRoomId()
  const userId = getPlayerId()
  const bouns = { i, j, color }
  socket.emit('bouns', roomId, userId, bouns)
}

export const sendMessage = (message: string) => {
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
