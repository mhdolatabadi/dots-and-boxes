import { dispatchGameMode, getGameMode } from '../../scenes/_slice/game.slice'
import {
  dispatchApplyMove3D,
  dispatchStartGame3D,
  getGame3D,
} from '../../scenes/_slice/game3d.slice'
import store from '../../setup/store/store'
import { chooseMove3D } from './ai3d'
import { cubeKey, edgeKey } from './grid3d'

export const DEFAULT_SIZE_3D = 3
const THINK_DELAY_MS = 600

// Starts a fresh local 3D game: no backend, no room -- just the lattice
// and the AI in this same browser tab, same as the 2D vs-computer mode.
export const startComputer3DGame = (size = DEFAULT_SIZE_3D) => {
  dispatchStartGame3D(size)
  dispatchGameMode('computer3d')
}

let isThinking = false

const playComputerMove3D = () => {
  const state = getGame3D()
  // Re-check hasPermission at execution time, not just when this was
  // scheduled -- the human may have just completed a cube and earned a
  // bonus turn (see the equivalent fix in services/computer/computer.service.js).
  if (getGameMode() !== 'computer3d' || state.winner || state.hasPermission) {
    isThinking = false
    return
  }

  const move = chooseMove3D(state.edges, state.size)
  if (!move) {
    isThinking = false
    return
  }

  const key = edgeKey(move.edge.a, move.edge.b)
  const completedKeys = move.completes.map(cubeKey)
  dispatchApplyMove3D(key, state.opponentColor, completedKeys)

  if (completedKeys.length > 0) {
    setTimeout(playComputerMove3D, THINK_DELAY_MS)
  } else {
    isThinking = false
  }
}

// Same watcher pattern as the 2D computer service: react to hasPermission
// flipping to false while in 'computer3d' mode, and play after a short
// "thinking" delay. Gated on game.slice's mode field so this never fires
// outside the 3D scene.
store.subscribe(() => {
  if (getGameMode() !== 'computer3d') return
  const state = getGame3D()
  if (state.winner) return
  if (state.hasPermission) return
  if (isThinking) return

  isThinking = true
  setTimeout(playComputerMove3D, THINK_DELAY_MS)
})
