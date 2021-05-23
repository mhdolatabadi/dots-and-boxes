import { get, set, messages } from './data.js'
import {
  addLineToSquare,
  checkCondition,
  findSpace,
  checkEnd,
  markLine,
  checkah,
  getNumberOfLine,
} from './logic.js'
import { send, requestGift, sendMessage } from './router.js'
import { getUserFirstName } from '../build/index.js'

const oddScale = 1
const evenScale = 4
const paper = document.getElementById('paper')
const header = document.getElementById('header')
const xlines = document.getElementsByClassName('xline')
const ylines = document.getElementsByClassName('yline')
const input = document.getElementById('input')
const sendButton = document.getElementsByClassName('send-button')[0]
const sendPanel = document.getElementById('send-panel')
const buttonContainer = document.getElementById('button-container')
const yourMessage = document.getElementsByClassName('your-message')[0]
const blue = document.getElementsByClassName('blue')[0]
const red = document.getElementsByClassName('red')[0]
const infoContainer = document.getElementById('info-container')
const fullInformation = document.getElementsByClassName('full-information')[0]

const audio = new Audio('./assets/line2.mp3')
const sendAudio = new Audio('./assets/i-demand-attention-244.mp3')

let timeout
const sendMessageInitializer = () => {
  sendButton.addEventListener('click', () => {
    if (input.value) {
      clearTimeout(timeout)
      sendAudio.play()
      yourMessage.style.display = 'block'
      yourMessage.innerHTML = input.value
      sendMessage(input.value)
      input.value = ''
      setTimeout(() => (yourMessage.style.display = 'none'), 20000)
    }
  })
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      if (input.value) {
        clearTimeout(timeout)
        sendAudio.play()
        yourMessage.style.display = 'block'
        yourMessage.innerHTML = input.value
        sendMessage(input.value)
        input.value = ''
        timeout = setTimeout(() => (yourMessage.style.display = 'none'), 20000)
      }
    }
  })
}

export const render = () => {
  createElements()
  stylePaperBy('row')
  stylePaperBy('column')
  lineInitializer(xlines, 'click')
  lineInitializer(ylines, 'click')
  lineInitializer(xlines, 'touch')
  lineInitializer(ylines, 'touch')
  changeLanguage('click')
  changeLanguage('touch')
  sendMessageInitializer()
  show('touch', header, infoContainer)
  show('click', header, infoContainer)
  show('touch', buttonContainer, sendPanel)
  show('click', buttonContainer, sendPanel)
  // show('click', red, fullInformation, 'red')
  // show('click', blue, fullInformation, 'blue')
}

const show = (event, key, value, className) => {
  key.addEventListener(event, () => {
    if (value.style.display === 'flex') value.style.display = 'none'
    else value.style.display = 'flex'
    if (className) {
      value.classList.remove(`${className === 'red' ? 'blue' : 'red'}-info`)
      value.classList.add(`${className}-info`)
    }
  })
}

const lineInitializer = (array, event) => {
  for (let i = 0; i < array.length; i++)
    array[i].addEventListener(event, () => {
      hitLine(array[i], get('color'))
      if (get('gift')) {
        requestGift()
        set('gift', false)
      }
    })
}

export const canHit = (line, color) => {
  return (
    (get('permission') || color === get('opponentColor')) &&
    get('role') !== 'subscriber' &&
    !get('waiting') &&
    !get('end') &&
    get('table').lines[getNumberOfLine(line)] !== 1
  )
}

export const helpLine = (line, color) => {
  colorLine(line, color)
  addLineToSquare(line)
  markLine(line)
  checkCondition(color)
  checkEnd()
}

export const hitLine = (line, color) => {
  if (canHit(line, color)) {
    helpLine(line, checkah())
    audio.play()
    send(line)
    set('permission', false)
  }
}

export const colorLine = (line, color) => {
  line.style.backgroundColor = color
}

const createElements = () => {
  for (let i = 1; i <= 2 * get('row') - 1; i++)
    for (let j = 1; j <= 2 * get('column') - 1; j++) {
      const div = document.createElement('div')
      div.setAttribute('class', 'grid-item')
      div.setAttribute('i', i)
      div.setAttribute('j', j)
      paper.appendChild(div)
      alignStyle(div, i, j)
    }
}
const stylePaperBy = (orientation) => {
  let template = ''
  for (let k = 0; k < 2 * get('row') - 1; k++)
    if (k % 2 === 0) template += oddScale + 'fr '
    else template += evenScale + 'fr '
  if (orientation === 'row') paper.style.gridTemplateRows = template
  else if (orientation === 'column') paper.style.gridTemplateColumns = template
}

const dotsData = {
  green: {
    count: 0,
    nextColor: 'orange',
    message: 'احسنت! یه مورد ویژگی جدید پیدا کردی',
  },
  orange: {
    count: 36,
    nextColor: 'rebeccapurple',
    message: 'رنگ تغییر یافت به بنفش',
  },
  rebeccapurple: {
    count: 0,
    nextColor: 'green',
    message: 'رنگ تغییر یافت به سبز',
  },
}

const clickDot = (div) => {
  const currentColor = div.style.backgroundColor
  console.log(currentColor)
  const { nextColor, message } = dotsData[currentColor]
  console.log(dotsData[currentColor])
  div.style.backgroundColor = nextColor

  dotsData[currentColor].count -= 1
  dotsData[nextColor].count += 1
  if (dotsData[nextColor].count === 36) {
    showMessage(message)
    buttonContainer.style.backgroundColor = nextColor
    header.style.backgroundColor = nextColor
    nextColor !== 'orange'
      ? (header.style.color = 'white')
      : (header.style.color = 'black')
    dotsData[nextColor].count = 0
  } else
    get('waiting')
      ? (header.innerHTML = 'در انتظار حریف...')
      : (header.innerHTML = 'نقطه‌بازی')
}

const initializeDot = (div) => {
  div.style.backgroundColor = 'orange'
  div.addEventListener('click', () => clickDot(div))
}

const alignStyle = (div, i, j) => {
  if ((i * j) % 2 === 1) setDivStyle(div, `${j}`, `${i}`, 'dot')
  else if (i % 2 === 1 && j % 2 !== 1)
    setDivStyle(div, `${j - 1} / ${j + 2}`, `${i}`, 'xline')
  else if (i % 2 !== 1 && j % 2 === 1)
    setDivStyle(div, `${j}`, `${i - 1} / ${i + 2}`, 'yline')
  else setDivStyle(div, `${j - 1} / ${j + 2}`, `${i - 1} / ${i + 2}`, 'space')
}

const setDivStyle = (div, col, row, styleClass) => {
  div.style.gridColumn = col
  div.style.gridRow = row
  div.setAttribute('class', styleClass)
  if (styleClass === 'space') div.setAttribute('line', 0)
  if (styleClass === 'dot') initializeDot(div)
}

export const updateScoreBoard = () => {
  const myElement = document.getElementById(get('color'))
  const oppElement = document.getElementById(get('opponentColor'))
  myElement.innerHTML = get('name') + ': ' + get('score')
  oppElement.innerHTML = get('opponentName') + ': ' + get('opponentScore')
}

export const updateScore = (color) => {
  if (get('color') === color) set('score', get('score') + 1)
  else if (get('opponentColor') === color)
    set('opponentScore', get('opponentScore') + 1)
  updateScoreBoard()
}

export const showTurn = () => {
  const isMyTurn = get('permission')
  const myColor = get('color')
  const oppColor = get('opponentColor')
  const myElement = document.getElementsByClassName(get('color'))[0]
  const oppElement = document.getElementsByClassName(get('opponentColor'))[0]
  myElement.classList.toggle(`active-${myColor}`, isMyTurn)
  oppElement.classList.toggle(`active-${oppColor}`, !isMyTurn)
  myElement.innerHTML = get('name') + ': ' + get('score')
  oppElement.innerHTML = get('opponentName') + ': ' + get('opponentScore')
}

export const showEnd = (winner) => {
  const myColor = get('color')
  document.body.style.backgroundColor = 'dark' + winner
  if (winner === myColor) {
    showMessage('winner')
    gameanalytics.GameAnalytics.addProgressionEvent(
      gameanalytics.EGAProgressionStatus.Fail,
      'main',
      'main',
      'main',
      get('score')
    )
    gameanalytics.GameAnalytics.addProgressionEvent(
      gameanalytics.EGAProgressionStatus.Complete,
      'main',
      'main',
      'main',
      get('opponentScore')
    )
  } else showMessage('loser')
  set('end', true)
}

export const colorBox = (i, j, color) => {
  const space = findSpace(i, j)
  space.style.backgroundColor = 'dark' + color
  if (color === 'red') space.innerHTML = 'ق'
  else space.innerHTML = 'آ'
}

export const getMesaageOfLanguge = (type) => {
  if (get('language') === 'english') {
    switch (type) {
      case 'waiting':
        header.innerHTML = messages.english.waiting
        break
      case 'header':
        header.innerHTML = messages.english.header
        break
      case 'winner':
        header.innerHTML = messages.english.winner
        break
      case 'loser':
        header.innerHTML = messages.english.loser
        break
      case 'resign':
        document.getElementById('resign').innerHTML = messages.english.resign
        break
      case 'language':
        document.getElementById('language').innerHTML =
          messages.english.language
        break
      case 'subscriber':
        header.innerHTML = messages.english.subscriber
        break
    }
  } else if (get('language') === 'persian') {
    switch (type) {
      case 'waiting':
        header.innerHTML = messages.persian.waiting
        break
      case 'header':
        header.innerHTML = messages.persian.header
        break
      case 'winner':
        header.innerHTML = messages.persian.winner
        break
      case 'loser':
        header.innerHTML = messages.persian.loser
        break
      case 'resign':
        document.getElementById('resign').innerHTML = messages.persian.resign
        break
      case 'language':
        document.getElementById('language').innerHTML =
          messages.persian.language
        break
      case 'subscriber':
        header.innerHTML = messages.persian.subscriber
        break
      default:
        header.innerHTML = type
    }
  }
}

export const showMessage = (message) => {
  if (message !== 'header') header.style.fontSize = '25px'
  else header.style.fontSize = '40px'
  getMesaageOfLanguge(message)
}

export const initializeTurn = () => {
  const myColor = get('color')
  if (myColor === 'red') {
    set('permission', true)
    set('opponentColor', 'blue')
  } else {
    set('permission', false)
    set('opponentColor', 'red')
  }
  set('name', getUserFirstName())
}

export const changeLanguage = (event) => {
  const language = document.getElementById('language')
  if (language !== null) {
    language.addEventListener(event, () => {
      if (get('language') === 'persian') {
        header.innerHTML = messages.english.header
        document.getElementById('resign').innerHTML =
          messages.english.resignButton
        document.getElementById('language').innerHTML =
          messages.english.languageButton
        set('language', 'english')
      } else {
        header.innerHTML = messages.persian.header
        document.getElementById('resign').innerHTML =
          messages.persian.resignButton
        document.getElementById('language').innerHTML =
          messages.persian.languageButton
        set('language', 'persian')
      }
    })
  }
}
