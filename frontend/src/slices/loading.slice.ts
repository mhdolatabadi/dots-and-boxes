import { createSlice } from '@reduxjs/toolkit'
import store from '../setting/store/store'
import { RootState } from '../setting/store/rootReducer'

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
export const isLoadingView = (state: RootState) => state.loading.isLoading

export const dispatchIsWaiting = (isLoading: boolean) =>
  store.dispatch(setLoading(isLoading))
