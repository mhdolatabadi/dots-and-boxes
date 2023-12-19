import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { dispatch } from '../setting/store/store'
import {
  getOpponentColor,
  getOpponentId,
  getPaperSize,
  getPlayerColor,
  getPlayerId,
  opponentScoreView,
  playerScoreView,
  roomWinnerView,
  setRoomWinner,
} from '../slices/game.slice'

export const useInitializeData = () => {
  const paperSize = getPaperSize()
  const playerId = getPlayerId()
  const playerColor = getPlayerColor()
  const playerScore = useSelector(playerScoreView)

  const opponentId = getOpponentId()
  const opponentScore = useSelector(opponentScoreView)
  const opponentColor = getOpponentColor()

  const winner = useSelector(roomWinnerView)
  useEffect(() => {
    if (winner) return
    if (playerScore + opponentScore === (paperSize - 1) * (paperSize - 1)) {
      const winner =
        playerScore > opponentScore
          ? { id: playerId, color: playerColor }
          : opponentScore > playerScore
          ? { id: opponentId, color: opponentColor }
          : 'draw'
      dispatch(setRoomWinner(winner))
    }
  })
}
