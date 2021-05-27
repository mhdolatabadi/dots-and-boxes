import {
  dispatchPlayerId,
  dispatchRoomId,
  dispatchSetPlayerName,
} from '../../../scenes/_slice/game.slice'

const { W } = window
export const wappDidStart = async () => {
  const userId = W.user.userId()
  const roomId = W.wapp.getWisId()
  const playerName = W.user.getFirstname()
  dispatchPlayerId(userId)
  dispatchRoomId(roomId)
  dispatchSetPlayerName(playerName)
}
