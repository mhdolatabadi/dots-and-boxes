import { configureStore } from '@reduxjs/toolkit'

import reducer from './rootReducer'

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'development',
})

export const { dispatch, getState } = store
export default store
