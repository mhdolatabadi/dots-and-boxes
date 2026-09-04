import {
  dispatchGameMode,
  dispatchResetGame,
  dispatchRoomId,
} from '../../scenes/_slice/game.slice'
import { setLoading } from '../../scenes/_slice/loading.slice'
import { joinOnlineRoom } from '../backend/backend.service'
import store from '../../setup/store/store'
import { getWisId } from '../weblite/weblite.api'

// Joins (or creates) a room from the URL's ?room= link and hands off to
// the real backend over Socket.IO. The 3s delay mirrors the original
// "connecting..." loading screen this replaced.
export const startOnlineGame = () => {
  dispatchResetGame()
  dispatchGameMode('online')
  dispatchRoomId(getWisId())
  joinOnlineRoom()
  setTimeout(() => store.dispatch(setLoading(false)), 3000)
}
