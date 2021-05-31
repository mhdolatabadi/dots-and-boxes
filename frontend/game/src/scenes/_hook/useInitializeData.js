import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { dispatch } from '../../setup/store/store'
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
} from '../_slice/game.slice'

export const useInitializeData = () => {
  const paperSize = getPaperSize()
  const playerId = getPlayerId()
  const playerColor = getPlayerColor()
  const playerScore = useSelector(playerScoreView)

  const opponentId = getOpponentId()
  const opponentScore = useSelector(opponentScoreView)
  const opponentColor = getOpponentColor()

  const winner = useSelector(roomWinnerView)
  console.log({
    playerScore,
    opponentScore,
    playerColor,
    opponentColor,
    winner,
    paperSize,
    bool: playerScore + opponentScore === (paperSize - 1) * (paperSize - 1),
  })
  useEffect(() => {
    if (winner) return
    if (playerScore + opponentScore === (paperSize - 1) * (paperSize - 1)) {
      console.log('here')
      const winner =
        playerScore > opponentScore
          ? { id: playerId, color: playerColor }
          : opponentScore > playerScore
          ? { id: opponentId, color: opponentColor }
          : console.log('draw!(')
      dispatch(setRoomWinner(winner))
    }
  })
}
