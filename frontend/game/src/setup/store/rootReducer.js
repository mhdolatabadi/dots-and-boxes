import { combineReducers } from '@reduxjs/toolkit'

import homeReducer from '../../scenes/_slice/home.slice'
import gameReducer from '../../scenes/_slice/game.slice'
// import userReducer from '../../scenes/_slice/user.slice'

const rootReducer = combineReducers({
  home: homeReducer,
  game: gameReducer,
  // user: userReducer,
})
export default rootReducer
