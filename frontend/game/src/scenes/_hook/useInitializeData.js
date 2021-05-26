import { useEffect } from 'react'
import { getCurrentUserId, getWisId } from '../../services/weblite/weblite.api'
import { dispatchPlayerId, dispatchRoomId } from '../_slice/game.slice'

export const useInitializeData = () => {
  const userId = getCurrentUserId()
  const roomId = getWisId()

  useEffect(() => {
    dispatchPlayerId(userId)
    dispatchRoomId(roomId)
  }, [userId, roomId])

  // return [colorId, changeColor]
}
