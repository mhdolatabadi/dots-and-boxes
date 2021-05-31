import {
  setPlayerId,
  setPlayerName,
  setRoomId,
} from '../../../scenes/_slice/game.slice'
import { setLoading } from '../../../scenes/_slice/loading.slice'
import store from '../../store/store'

const { W } = window
export const wappDidStart = () => {
  const userId = W.user.getId()
  const roomId = W.wapp.getWisId()
  const playerName = W.user.getFirstname()

  store.dispatch(setPlayerId({ id: userId }))
  store.dispatch(setRoomId({ id: roomId }))
  store.dispatch(setPlayerName({ name: playerName }))
  setTimeout(() => store.dispatch(setLoading(false)), 3000)
}
