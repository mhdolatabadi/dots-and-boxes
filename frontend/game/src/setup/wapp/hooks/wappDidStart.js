import {
  setPlayerId,
  setPlayerName,
  setRoomId,
} from '../../../scenes/_slice/game.slice'
import { setLoading } from '../../../scenes/_slice/loading.slice'
import store from '../../store/store'
import {
  getCurrentUserId,
  getUserFirstName,
  getWisId,
} from '../../../services/weblite/weblite.api'

export const wappDidStart = () => {
  const userId = getCurrentUserId()
  const roomId = getWisId()
  const playerName = getUserFirstName()

  store.dispatch(setPlayerId({ id: userId }))
  store.dispatch(setRoomId({ id: roomId }))
  store.dispatch(setPlayerName({ name: playerName }))
  setTimeout(() => store.dispatch(setLoading(false)), 3000)
}
