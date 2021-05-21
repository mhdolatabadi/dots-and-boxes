import { get, set } from './data.js'
import { recieve } from './logic.js'
import {
  initializeTurn,
  showMessage,
  showEnd,
  showTurn,
  updateScoreBoard,
} from './gameRender.js'
import { getUserFirstName, getUserId, roomId } from './index.js'

const socket = io('https://noghteh-bazi.wapp.weblite.me/')
// const socket = io('http://localhost:3000')

socket.on('handshake', () => {
  socket.emit('handshake', roomId(), getUserId())
})

socket.on('color', (turn) => {
  set('color', turn)
  initializeTurn()
})

socket.on('wait', (type) => {
  if (type === 'wait') {
    showMessage('waiting')
    set('waiting', true)
  } else {
    gameanalytics.GameAnalytics.addProgressionEvent(
      gameanalytics.EGAProgressionStatus.Start,
      'main',
      'main',
      'main'
    )
    showMessage('header')
    set('waiting', false)
    socket.emit('wait', get('userId'), get('roomId'), get('opponentColor'))
    socket.emit('name', get('userId'), get('roomId'))
  }
})

socket.on('watch', (history) => {
  if (history.length > 0) {
    for (let i = 0; i < history.length; i++) {
      recieve(history[i], history[i].color)
    }
  }
})

socket.on('introduce', () => {
  console.log('hello!')
  socket.emit('introduce', get('userId'), get('roomId'), getUserFirstName())
})

socket.on('name', (name) => {
  set('opponentName', name)
  showTurn()
  updateScoreBoard()
})

socket.on('role', (role, turn) => {
  if (turn === get('color')) set('permission', true)
  else set('permission', false)
  set('role', role)
  showMessage('subscriber')
  socket.emit('getname', get('roomId'))
})

socket.on('getname', (redName, blueName) => {
  if (get('role') === 'subscriber') {
    set('name', redName)
    set('opponentName', blueName)
  }
  showTurn()
  updateScoreBoard()
})
export const send = (line) => {
  const i = line.getAttribute('i')
  const j = line.getAttribute('j')
  const type = line.getAttribute('class')
  const message = {
    x: i,
    y: j,
    kind: type,
  }
  socket.emit('change', get('userId'), get('roomId'), message)
}

export const sendMessage = (message) => {
  socket.emit('message', get('roomId'), message)
}

socket.on('message', (message) => {
  const opponentMessage = document.getElementsByClassName('opponent-message')[0]
  console.log(opponentMessage)
  opponentMessage.style.display = 'block'
  opponentMessage.innerHTML = message
  setInterval(() => (opponentMessage.style.display = 'none'), 20000)
})

socket.on('change', (line, turn) => {
  if (get('role') === 'subscriber') {
    set('opponentColor', turn)
    if (turn === 'red') set('color', 'blue')
    else set('color', 'red')
  }
  if (get('opponentColor') === turn) set('permission', true)
  recieve(line, turn)
})

export const requestGift = () => {
  socket.emit('gift', get('userId'), get('roomId'))
}
socket.on('gift', () => {
  set('permission', !get('permission'))
})

export const resign = () => {
  showEnd(get('opponentColor'))
  socket.emit('resign', get('userId'), get('roomId'))
}
socket.on('resign', () => {
  showEnd(get('color'))
  socket.emit('disconnect', get('userId'), get('roomId'))
})
socket.on('permission', (permission) => {
  set('permission', permission)
})

socket.on('warning', (warning) => {
  console.log(warning)
})
