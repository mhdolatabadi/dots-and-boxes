import {
  addNewLine,
  dispatchGameMode,
  dispatchHasPermission,
  dispatchOpponentColor,
  dispatchOpponentId,
  dispatchOpponentName,
  dispatchPlayerColor,
  dispatchResetGame,
  dispatchRoomId,
  dispatchSetOpponentLastMove,
  dispatchSetRoomLastMove,
  getGameMode,
  getPaperSize,
  getRoomHasPermission,
  getRoomWinner,
  setStatus,
} from '../../scenes/_slice/game.slice'
import { setLoading } from '../../scenes/_slice/loading.slice'
import store from '../../setup/store/store'
import { chooseMove } from './ai'

export const COMPUTER_ID = 'computer'
export const COMPUTER_COLOR = 'blue'
export const COMPUTER_NAME = 'کامپیوتر'

const THINK_DELAY_MS = 600

// Starts a fresh local game against the computer: no backend, no room
// to share, just the board and the AI in this same browser tab.
export const startComputerGame = () => {
  dispatchResetGame()
  dispatchGameMode('computer')
  dispatchPlayerColor('red')
  dispatchOpponentId(COMPUTER_ID)
  dispatchOpponentColor(COMPUTER_COLOR)
  dispatchOpponentName(COMPUTER_NAME)
  dispatchRoomId(`local-${Date.now()}`)
  dispatchHasPermission(true)
  store.dispatch(setStatus({ status: 'connected' }))
  store.dispatch(setLoading(false))
}

let isThinking = false

const playComputerMove = () => {
  const state = store.getState()
  if (getGameMode(state) !== 'computer' || getRoomWinner(state)) {
    isThinking = false
    return
  }

  const paperSize = getPaperSize(state)
  const move = chooseMove(state.game.room.history, paperSize)
  if (!move) {
    isThinking = false
    return
  }

  store.dispatch(addNewLine({ i: move.i, j: move.j, color: COMPUTER_COLOR }))
  dispatchSetOpponentLastMove(move.i, move.j, COMPUTER_COLOR)
  dispatchSetRoomLastMove(move.i, move.j, COMPUTER_COLOR)

  if (move.completes > 0) {
    // Completed a box -- bonus turn, go again after a short pause.
    setTimeout(playComputerMove, THINK_DELAY_MS)
  } else {
    dispatchHasPermission(true)
    isThinking = false
  }
}

// Watches for it becoming the computer's turn (the human's move flips
// hasPermission to false) and plays a move after a short "thinking"
// delay. Bonus turns chain directly from playComputerMove itself, not
// through this subscription, so isThinking stays true for the whole
// chain and this only ever kicks off the first move of a turn.
store.subscribe(() => {
  const state = store.getState()
  if (getGameMode(state) !== 'computer') return
  if (getRoomWinner(state)) return
  if (getRoomHasPermission(state)) return
  if (isThinking) return

  isThinking = true
  setTimeout(playComputerMove, THINK_DELAY_MS)
})
