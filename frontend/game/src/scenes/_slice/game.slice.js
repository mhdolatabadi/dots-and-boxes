import { createSlice } from '@reduxjs/toolkit'

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    roomId: undefined,
    paper: {
      row: 6,
      column: 6,
    },
    player: {
      userId: undefined,
      name: 'نامشخص',
      color: 'red',
      score: 0,
    },
    opponent: {
      userId: undefined,
      name: 'نامشخص',
      color: 'blue',
      score: 0,
    },
    letter: undefined,
    role: undefined,
    end: false,
    permission: false,
    waiting: false,
    gift: false,
    language: 'persian',
    table: {
      lines: [],
      squares: [],
    },
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload
    },
  },
})

const { actions, reducer } = gameSlice
export const { setData } = actions
export default reducer

/* Views */
export const playerColorView = state => state.game.player.color
export const opponentColorView = state => state.game.opponent.color
