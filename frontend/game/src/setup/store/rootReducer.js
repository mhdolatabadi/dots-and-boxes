import { combineReducers } from '@reduxjs/toolkit'

import gameReducer from '../../scenes/_slice/game.slice'
import game3dReducer from '../../scenes/_slice/game3d.slice'
import loadingReducer from '../../scenes/_slice/loading.slice'
import localeReducer from '../../scenes/_slice/locale.slice'
// import userReducer from '../../scenes/_slice/user.slice'

const rootReducer = combineReducers({
  game: gameReducer,
  game3d: game3dReducer,
  loading: loadingReducer,
  locale: localeReducer,
  // user: userReducer,
})
export default rootReducer
