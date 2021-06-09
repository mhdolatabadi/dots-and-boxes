import { createSlice } from '@reduxjs/toolkit'
// import { __STORE_DISPATCH__ } from '../../setup/store'

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    colorId: 0,
  },
  reducers: {
    setColorId: (state, action) => {
      // mutation won't cause any problem here
      // or you can enhance all your config in payload object
      state.colorId = action.payload
    },
  },
})

const { actions, reducer } = homeSlice
export default reducer

// ACTIONS
export const { setColorId } = actions
// DISPATCHES
// you can use following code outside react component, it directly dispatch to redux
// e.g. in response of fetch request
// const dispatchSetColorId = colorId => __STORE_DISPATCH__(setColorId(colorId))

// VIEW
export const colorIdView = state => state.home.colorId
// if you need part of your current slice, prefix your function with get
// const getSomethingView = id => state => state.home.something[id]
