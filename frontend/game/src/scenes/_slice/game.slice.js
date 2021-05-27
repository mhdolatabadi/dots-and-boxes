import { createSlice } from '@reduxjs/toolkit'
import store from '../../setup/store/store'

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    paper: {
      row: 6,
      column: 6,
    },
    player: {
      id: undefined,
      name: 'هوشنگ',
      color: '',
      score: 0,
      letter: 'ه',
      lastMove: {},
    },
    opponent: {
      id: undefined,
      name: 'بیژن',
      color: '',
      score: 0,
      letter: 'ب',
      lastMove: {},
    },
    room: {
      id: undefined,
      role: undefined,
      isWaiting: false,
      hasPermission: false,
      end: false,
      gift: false,
      history: {},
      lastMove: {},
    },
    language: 'persian',
    status: 'connecting',
  },
  reducers: {
    setPlayerColor: (state, action) => {
      const { color } = action.payload
      state.player.color = color
    },
    setOpponentName: (state, action) => {
      const { name } = action.payload
      state.opponent.name = name
    },
    setOpponentId: (state, action) => {
      const { id } = action.payload
      state.opponent.id = id
    },
    setPlayerId: (state, action) => {
      const { id } = action.payload
      state.player.id = id
    },
    setRoomId: (state, action) => {
      const { id } = action.payload
      state.room.id = id
    },
    setIsWaiting: (state, action) => {
      const { isWaiting } = action.payload
      state.room.isWaiting = isWaiting
    },
    setHasPermission: (state, action) => {
      const { hasPermission } = action.payload
      state.room.hasPermission = hasPermission
    },
    addNewLine: (state, action) => {
      const { i, j, color } = action.payload
      state.room.history[i] = { ...state.room.history[i] }
      state.room.history[i][j] = color
    },
    setPlayerLastMove: (state, action) => {
      const { i, j, color } = action.payload
      state.player.lastMove = { i, j, color }
    },
    setOpponentLastMove: (state, action) => {
      const { i, j, color } = action.payload
      state.opponent.lastMove = { i, j, color }
    },
    setRoomLastMove: (state, action) => {
      const { i, j, color } = action.payload
      state.room.lastMove = { i, j, color }
    },
    setStatus: (state, action) => {
      const { status } = action.payload
      state.status = status
    },
    setHistory: (state, action) => {
      const { history } = action.payload
      state.room.history = history
    },
    increasePlayerScore: (state, aciton) => {
      state.player.score += 1
    },
    increaseOpponentScore: (state, aciton) => {
      state.opponent.score += 1
    },
  },
})

const { actions, reducer } = gameSlice
export const {
  setPlayerColor,
  setPlayerId,
  setOpponentName,
  setOpponentId,
  setRoomId,
  setIsWaiting,
  setHasPermission,
  addNewLine,
  setStatus,
  setHistory,
  setPlayerLastMove,
  setOpponentLastMove,
  setRoomLastMove,
  increasePlayerScore,
  increaseOpponentScore,
} = actions
export default reducer

/* Views */
export const statusView = state => state.game.status
export const playerIdView = state => state.game.player.id
export const playerColorView = state => state.game.player.color
export const playerNameView = state => state.game.player.name
export const playerScoreView = state => state.game.player.score

export const opponentIdView = state => state.game.opponent.id
export const opponentColorView = state => state.game.opponent.color
export const opponentNameView = state => state.game.opponent.name
export const opponentScoreView = state => state.game.opponent.score

export const roomIsWaitingView = state => state.game.room.isWaiting
export const roomHasPermissionView = state => state.game.room.hasPermission
export const roomLastMoveView = state => state.game.room.lastMove

export const paperRowNumberView = state => state.game.paper.row
export const paperColumnNumberView = state => state.game.paper.column

export const elementColorView = (i, j) => state =>
  state.game.room.history[i] ? state.game.room.history[i][j] : ''

/* Getters */
export const getRoomId = state => (state ?? store.getState()).game.room.id
export const getRoomHasPermission = state =>
  (state ?? store.getState()).game.room.hasPermission
export const getPlayerId = state => (state ?? store.getState()).game.player.id
export const getPlayerName = state =>
  (state ?? store.getState()).game.player.name
export const getPlayerColor = state =>
  (state ?? store.getState()).game.player.color
export const getOpponentName = state =>
  (state ?? store.getState()).game.opponent.name
export const getPlayerHasPermission = state =>
  (state ?? store.getState()).game.room.hasPermission

export const getLineView = (i, j) => state =>
  (state ?? store.getState()).game.room.history[i][j] || {}

/* Dispatches */
export const dispatchPlayerColor = color =>
  store.dispatch(setPlayerColor({ color }))
export const dispatchPlayerId = id => store.dispatch(setPlayerId({ id }))

export const dispatchOpponentName = name =>
  store.dispatch(setOpponentName({ name }))

export const dispatchOpponentId = id => store.dispatch(setOpponentId({ id }))

export const dispatchRoomId = id => store.dispatch(setRoomId({ id }))

export const dispatchIsWaiting = isWaiting =>
  store.dispatch(setIsWaiting({ isWaiting }))

export const dispatchHasPermission = hasPermission =>
  store.dispatch(setHasPermission({ hasPermission }))

export const dispatchAddNewLine = (i, j, color) =>
  store.dispatch(addNewLine({ i, j, color }))

export const dispatchSetPlayerLastMove = (i, j, color) =>
  store.dispatch(setPlayerLastMove({ i, j, color }))

export const dispatchSetOpponentLastMove = (i, j, color) =>
  store.dispatch(setOpponentLastMove({ i, j, color }))

export const dispatchSetRoomLastMove = (i, j, color) =>
  store.dispatch(setRoomLastMove({ i, j, color }))

export const dispatchSetStatus = status => store.dispatch(setStatus({ status }))

export const dispatchSetHistory = history =>
  store.dispatch(setHistory({ history }))
