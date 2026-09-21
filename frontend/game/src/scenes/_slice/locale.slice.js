import { createSlice } from '@reduxjs/toolkit'
import store from '../../setup/store/store'

export const LOCALE_STORAGE_KEY = 'dots-and-boxes:locale'
export const LOCALES = ['fa', 'en']

// ?lang= wins (so a link like ?lang=en can be shared and is what a
// crawler indexing that URL sees), then whatever the browser remembered
// from a previous visit, then Persian as the default.
const readInitialLocale = () => {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('lang')
    if (LOCALES.includes(fromUrl)) return fromUrl

    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    if (LOCALES.includes(stored)) return stored
  } catch (e) {
    // localStorage/URL unavailable -- fall through to the default
  }
  return 'fa'
}

const localeSlice = createSlice({
  name: 'locale',
  initialState: { current: readInitialLocale() },
  reducers: {
    setLocale: (state, action) => {
      state.current = action.payload
    },
  },
})

const { actions, reducer } = localeSlice
export const { setLocale } = actions
export default reducer

/* Views */
export const localeView = state => state.locale.current

/* Getters */
export const getLocale = state => (state ?? store.getState()).locale.current

/* Dispatches */
export const dispatchLocale = locale => {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  } catch (e) {
    // storage unavailable -- keep the choice in-memory for this session
  }
  store.dispatch(setLocale(locale))
}
