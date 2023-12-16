import { createSlice } from '@reduxjs/toolkit'
import store from '../../setup/store/store'
import { RootState } from '../../setup/store/rootReducer'

interface Message {
  sender: string
  content: string
}

type Colors = "red" | "blue"

type Status = "connecting" | "connected" | "waiting" | "disconnected"

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    theme: {
      darkMode: false,
      richMode: true,
    },
    paper: {
      row: 6,
      column: 6,
    },
    player: {
      id: undefined,
      name: 'نامشخص',
      color: 'red' as Colors,
      score: 0,
      letter: 'ه',
      lastMove: {},
      profileImage: '',
    },
    opponent: {
      id: undefined,
      name: 'نامشخص',
      color: 'blue' as Colors,
      score: 0,
      letter: 'ب',
      lastMove: {},
      profileImage: '',
    },
    room: {
      id: undefined,
      role: undefined,
      isWaiting: false,
      hasPermission: true,
      end: false,
      gift: false,
      messages: [] as Message[],
      history: [] as ("red" | "blue")[][],
      lastMove: {} as { i: number; j: number; color: string },
      winner: {} as { color: string },
    },
    changed: false,
    language: 'persian',
    status: 'connecting' as Status,
  },
  reducers: {
    setPlayerName: (state, action) => {
      const { name } = action.payload
      state.player.name = name
    },
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
      state.room.history[i] = [...state.room.history[i]]
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
    increasePlayerScore: (state, action) => {
      state.player.score += 1
    },
    increaseOpponentScore: (state, action) => {
      state.opponent.score += 1
    },
    addNewMessage: (state, action) => {
      const { sender, content } = action.payload
      state.room.messages.push({ sender, content })
    },
    setMessages: (state, action) => {
      const { messages } = action.payload
      state.room.messages = messages
    },
    setOpponentScore: (state, action) => {
      const { score } = action.payload
      state.opponent.score = score
    },
    setPlayerScore: (state, action) => {
      const { score } = action.payload
      state.player.score = score
    },
    setRoomWinner: (state, action) => {
      const winner = action.payload
      state.room.winner = winner
    },
    setOpponentColor: (state, action) => {
      const { color } = action.payload
      state.opponent.color = color
    },
    setPlayerProfileImage: (state, action) => {
      const profileImage = action.payload
      state.player.profileImage = profileImage
    },
    setOpponentProfileImage: (state, action) => {
      const profileImage = action.payload
      state.opponent.profileImage = profileImage
    },
    setTheme: (state, action) => {
      const theme = action.payload
      state.theme = theme
    },
    setChanged: (state, action) => {
      state.changed = action.payload
    },
  },
})

const { actions, reducer } = gameSlice
export const {
  setPlayerName,
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
  addNewMessage,
  setMessages,
  setOpponentScore,
  setPlayerScore,
  setRoomWinner,
  setOpponentColor,
  setTheme,
  setChanged,
  setOpponentProfileImage,
  setPlayerProfileImage,
} = actions
export default reducer

/* Views */
export const changedView = (state: RootState) => state.game.changed

export const themeView = (state: RootState) => state.game.theme

export const statusView = (state: RootState) => state.game.status

export const messagesView = (state: RootState) => state.game.room.messages

export const playerIdView = (state: RootState) => state.game.player.id
export const playerColorView = (state: RootState) => state.game.player.color
export const playerNameView = (state: RootState) => state.game.player.name
export const playerScoreView = (state: RootState) => state.game.player.score
export const playerProfileImageView = (state: RootState) =>
  state.game.player.profileImage

export const opponentIdView = (state: RootState) => state.game.opponent.id
export const opponentColorView = (state: RootState) => state.game.opponent.color
export const opponentNameView = (state: RootState) => state.game.opponent.name
export const opponentScoreView = (state: RootState) => state.game.opponent.score
export const opponentProfileImageView = (state: RootState) =>
  state.game.opponent.profileImage

export const roomIsWaitingView = (state: RootState) => state.game.room.isWaiting
export const roomHasPermissionView = (state: RootState) =>
  state.game.room.hasPermission
export const roomLastMoveView = (state: RootState) => state.game.room.lastMove
export const roomWinnerView = (state: RootState) => state.game.room.winner

export const paperRowNumberView = (state: RootState) => state.game.paper.row
export const paperColumnNumberView = (state: RootState) =>
  state.game.paper.column

export const elementColorView = (i: number, j: number) => (state: RootState) =>
  state.game.room.history[i] ? state.game.room.history[i][j] : ''

/* Getters */
export const getThemeView = (state: RootState) =>
  (state ?? store.getState()).game.theme

export const getRoomId = (state?: RootState) =>
  (state ?? store.getState()).game.room.id
export const getRoomHasPermission = (state?: RootState) =>
  (state ?? store.getState()).game.room.hasPermission
export const getPlayerId = (state?: RootState) =>
  (state ?? store.getState()).game.player.id

export const getPlayerName = (state?: RootState) =>
  (state ?? store.getState()).game.player.name

export const getPlayerColor = (state?: RootState) =>
  (state ?? store.getState()).game.player.color

export const getOpponentName = (state: RootState) =>
  (state ?? store.getState()).game.opponent.name

export const getPlayerHasPermission = (state: RootState) =>
  (state ?? store.getState()).game.room.hasPermission

export const getLineView = (i: number, j: number) => (state: RootState) =>
  (state ?? store.getState()).game.room.history[i][j] || {}

export const getPlayerScore = (state?: RootState) =>
  (state ?? store.getState()).game.player.score

export const getOpponentColor = (state?: RootState) =>
  (state ?? store.getState()).game.opponent.color
export const getOpponentId = (state?: RootState) =>
  (state ?? store.getState()).game.opponent.id
export const getOpponentScore = (state?: RootState) =>
  (state ?? store.getState()).game.opponent.score
export const getPaperSize = (state?: RootState) =>
  (state ?? store.getState()).game.paper.row

export const getRoomWinner = (state?: RootState) =>
  (state ?? store.getState()).game.room.winner

/* Dispatches */
export const dispatchTheme = (theme: object) => store.dispatch(setTheme(theme))

export const dispatchPlayerColor = (color: string) =>
  store.dispatch(setPlayerColor({ color }))

export const dispatchOpponentColor = (color: string) =>
  store.dispatch(setOpponentColor({ color }))

export const dispatchPlayerId = (id: string) =>
  store.dispatch(setPlayerId({ id }))

export const dispatchOpponentName = (name: string) =>
  store.dispatch(setOpponentName({ name }))

export const dispatchOpponentId = (id: string) =>
  store.dispatch(setOpponentId({ id }))

export const dispatchRoomId = (id: string) => store.dispatch(setRoomId({ id }))

export const dispatchIsWaiting = (isWaiting: boolean) =>
  store.dispatch(setIsWaiting({ isWaiting }))

export const dispatchHasPermission = (hasPermission: boolean) =>
  store.dispatch(setHasPermission({ hasPermission }))

export const dispatchAddNewLine = (i: number, j: number, color: string) =>
  store.dispatch(addNewLine({ i, j, color }))

export const dispatchSetPlayerLastMove = (
  i: number,
  j: number,
  color: string,
) => store.dispatch(setPlayerLastMove({ i, j, color }))

export const dispatchSetOpponentLastMove = (
  i: number,
  j: number,
  color: string,
) => store.dispatch(setOpponentLastMove({ i, j, color }))

export const dispatchSetRoomLastMove = (i: number, j: number, color: string) =>
  store.dispatch(setRoomLastMove({ i, j, color }))

export const dispatchSetStatus = (status: string) =>
  store.dispatch(setStatus({ status }))

export const dispatchSetHistory = (history: object) =>
  store.dispatch(setHistory({ history }))

export const dispatchSetMessages = (messages: Message[]) =>
  store.dispatch(setMessages({ messages }))

export const dispatchAddNewMessage = (message: string) =>
  store.dispatch(addNewMessage(message))

export const dispatchSetPlayerName = (name: string) =>
  store.dispatch(setPlayerName({ name }))

export const dispatchOpponentScore = (score: number) =>
  store.dispatch(setOpponentScore({ score }))

export const dispatchPlayerScore = (score: number) =>
  store.dispatch(setPlayerScore({ score }))

export const dispatchPlayerProfileImage = (profileImage: string) =>
  store.dispatch(setPlayerProfileImage(profileImage))

export const dispatchOpponentProfileImage = (profileImage: string) =>
  store.dispatch(setOpponentProfileImage(profileImage))

export const dispatchSetChanged = (value: boolean) =>
  store.dispatch(setChanged(value))
