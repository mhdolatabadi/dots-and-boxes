import { createSlice } from '@reduxjs/toolkit'
import store from '../../setup/store/store'

// A separate slice for the 3D "dots and cubes" mode. Its rules are a
// literal extension of the 2D game (edges instead of lines, unit cubes
// instead of boxes, 12 edges to complete a cube instead of 4 sides to
// complete a box) but the state shape is deliberately its own -- it
// doesn't reuse or alter anything in game.slice.js.

const totalCubes = size => Math.pow(size - 1, 3)

const buildInitialState = size => ({
  size,
  // `${x},${y},${z}-${x},${y},${z}` (sorted corner order) -> 'red' | 'blue'
  edges: {},
  // `${x},${y},${z}` (cube's minimum corner) -> 'red' | 'blue'
  cubes: {},
  playerColor: 'red',
  opponentColor: 'blue',
  playerScore: 0,
  opponentScore: 0,
  // Whether the local human player may move next.
  hasPermission: true,
  // null while playing, else { color } or { draw: true }
  winner: null,
})

const game3dSlice = createSlice({
  name: 'game3d',
  initialState: buildInitialState(3),
  reducers: {
    startGame3D: (state, action) => {
      const { size } = action.payload
      return buildInitialState(size)
    },
    // A move is fully resolved (which cubes it completes, if any) by the
    // caller before dispatching, so this reducer just applies the result
    // atomically -- no follow-up dispatches, no race between "the edge
    // got drawn" and "the bonus turn got granted".
    applyMove3D: (state, action) => {
      const { edgeKey, color, completedCubeKeys } = action.payload
      state.edges[edgeKey] = color

      completedCubeKeys.forEach(key => {
        state.cubes[key] = color
        if (color === state.playerColor) state.playerScore += 1
        else state.opponentScore += 1
      })

      if (Object.keys(state.cubes).length === totalCubes(state.size)) {
        state.winner =
          state.playerScore === state.opponentScore
            ? { draw: true }
            : {
                color:
                  state.playerScore > state.opponentScore
                    ? state.playerColor
                    : state.opponentColor,
              }
      }

      state.hasPermission =
        completedCubeKeys.length > 0
          ? color === state.playerColor
          : color !== state.playerColor
    },
  },
})

export const { startGame3D, applyMove3D } = game3dSlice.actions
export default game3dSlice.reducer

/* Views */
export const size3DView = state => state.game3d.size
export const edges3DView = state => state.game3d.edges
export const cubes3DView = state => state.game3d.cubes
export const playerColor3DView = state => state.game3d.playerColor
export const opponentColor3DView = state => state.game3d.opponentColor
export const playerScore3DView = state => state.game3d.playerScore
export const opponentScore3DView = state => state.game3d.opponentScore
export const hasPermission3DView = state => state.game3d.hasPermission
export const winner3DView = state => state.game3d.winner

/* Getters, for use outside components (the computer opponent's service) */
export const getGame3D = state => (state ?? store.getState()).game3d

/* Dispatches */
export const dispatchStartGame3D = size =>
  store.dispatch(startGame3D({ size }))

export const dispatchApplyMove3D = (edgeKey, color, completedCubeKeys) =>
  store.dispatch(applyMove3D({ edgeKey, color, completedCubeKeys }))
