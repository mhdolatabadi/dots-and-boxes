import { addCondition, get, set } from './data.js'
import { colorBox, updateScore, showEnd, helpLine } from './gameRender.js'

const spaces = document.getElementsByClassName('space')

export const addLineToSquare = (line) => {
  const j = line.getAttribute('j')
  const i = line.getAttribute('i')
  if (line.className == 'yline') {
    if (j != 1) addCondition(i / 2, Math.floor(j / 2))
    if (j != 2 * get('row') - 1) addCondition(i / 2, Math.ceil(j / 2))
  } else if (line.className == 'xline') {
    if (i != 1) addCondition(Math.floor(i / 2), j / 2)
    if (i != 2 * get('column') - 1) addCondition(Math.ceil(i / 2), j / 2)
  }
}

export const checkah = () => {
  if (get('permission')) return get('color')
  else return get('opponentColor')
}

export const checkCondition = (color) => {
  const condition = get('table').squares
  for (let i = 0; i < condition.length; i++)
    for (let j = 0; j < condition[i].length; j++)
      if (condition[i][j] === 4) {
        colorBox(i, j, color)
        condition[i][j] = 100000
        updateScore(color)
        if (get('permission') && get('color') === color) set('gift', true)
      }
}
export const findSpace = (i, j) => {
  for (let k = 0; k < spaces.length; k++) {
    const x = spaces[k].getAttribute('i')
    const y = spaces[k].getAttribute('j')
    if (i == x / 2 && j == y / 2) return spaces[k]
  }
}

export const checkEnd = () => {
  if (
    get('opponentScore') + get('score') ==
    (get('row') - 1) * (get('row') - 1)
  ) {
    set('end', true)
    if (get('opponentScore') > get('score'))
      return showEnd(get('opponentColor'))
    else return showEnd(get('color'))
  }
}

export const recieve = (message, color) => {
  helpLine(findLine(message), color)
}

export const getNumberOfLine = (line) => {
  let index
  const j = line.getAttribute('j')
  const i = line.getAttribute('i')
  if (i % 2 == 1) index = Math.floor(i / 2) * 11 + j / 2
  else index = (i - 1) * 5 + Math.floor(j / 2) + i / 2
  return index
}

export const markLine = (line) => {
  const index = getNumberOfLine(line)
  get('table').lines[index] = 1
}

export const findLine = (message) => {
  const i = message.x
  const j = message.y
  const type = message.kind
  const elements = document.getElementById('paper').childNodes
  for (let k = 0; k < elements.length; k++) {
    if (
      i === elements[k].getAttribute('i') &&
      j === elements[k].getAttribute('j') &&
      type === elements[k].getAttribute('class')
    )
      return elements[k]
  }
}
