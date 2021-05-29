import { createSlice } from '@reduxjs/toolkit'
import store from '../../setup/store/store'

const loadingSlice = createSlice({
  name: 'loading',
  initialState: { isLoading: true },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

const { actions, reducer } = loadingSlice
export const { setLoading } = actions
export default reducer

/* Views */
export const isLoadingView = state => state.loading.isLoading

export const dispatchIsWaiting = isLoading =>
  store.dispatch(setLoading(isLoading))
