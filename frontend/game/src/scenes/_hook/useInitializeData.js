import { useEffect } from 'react'
import {
  getCurrentUserId,
  getUserFirstName,
  getWisId,
} from '../../services/weblite/weblite.api'
import {
  dispatchPlayerId,
  dispatchRoomId,
  dispatchSetPlayerName,
} from '../_slice/game.slice'

export const useInitializeData = () => {
  return // return [colorId, changeColor]
}
