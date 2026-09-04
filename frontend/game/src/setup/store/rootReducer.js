import { combineReducers } from '@reduxjs/toolkit'

import gameReducer from '../../scenes/_slice/game.slice'
import loadingReducer from '../../scenes/_slice/loading.slice'
// import userReducer from '../../scenes/_slice/user.slice'

const rootReducer = combineReducers({
  game: gameReducer,
  loading: loadingReducer,
  // user: userReducer,
})
export default rootReducer
