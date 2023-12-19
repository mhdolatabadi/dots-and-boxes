import { combineReducers } from '@reduxjs/toolkit'

import homeReducer from '../../slices/home.slice'
import gameReducer from '../../slices/game.slice'
import loadingReducer from '../../slices/loading.slice'
// import userReducer from '../../scenes/_slice/user.slice'

const rootReducer = combineReducers({
  home: homeReducer,
  game: gameReducer,
  loading: loadingReducer,
  // user: userReducer,
})
export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
