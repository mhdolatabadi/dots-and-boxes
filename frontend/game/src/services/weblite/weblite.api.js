const PLAYER_STORAGE_KEY = 'dots-and-boxes:player'

const generateId = () =>
  window.crypto && window.crypto.randomUUID
    ? window.crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

const loadPlayer = () => {
  try {
    return JSON.parse(window.localStorage.getItem(PLAYER_STORAGE_KEY)) || {}
  } catch (e) {
    return {}
  }
}

const savePlayer = (player) => {
  try {
    window.localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(player))
  } catch (e) {
    // storage unavailable (private mode, disabled cookies, ...): keep playing in-memory
  }
}

const player = loadPlayer()
if (!player.id) player.id = generateId()
if (!player.name)
  player.name = window.prompt('اسمت رو وارد کن:', '')?.trim() || 'مهمان'
savePlayer(player)

export const getCurrentUserId = () => player.id

export const getUserFirstName = () => player.name

export const openImageInModal = () => {}

export const getUsersEducationalProfile = async () => ({})

export const sendAnalytics = () => {}

export const doneDrawer = () => {}

// A room is a shared link: whoever opens the URL with the same ?room= id
// joins the same game. If none is present, generate one and put it in the
// URL so the host can share the link with an opponent.
export const getWisId = () => {
  const params = new URLSearchParams(window.location.search)
  let roomId = params.get('room')
  if (!roomId) {
    roomId = generateId()
    params.set('room', roomId)
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}?${params.toString()}`
    )
  }
  return roomId
}
