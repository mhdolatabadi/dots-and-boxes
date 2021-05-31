import * as React from 'react'
// style
import useStyle from './score-board.style'
import clsx from 'clsx'
// localiztion
import { useSelector } from 'react-redux'
import {
  getPlayerHasPermission,
  opponentNameView,
  opponentScoreView,
  playerColorView,
  playerNameView,
  playerScoreView,
} from '../../../_slice/game.slice'

export default function ScoreBoard(props) {
  const classes = useStyle()
  const playerName = useSelector(playerNameView)
  const playerColor = useSelector(playerColorView)
  const playerScore = useSelector(playerScoreView)
  const opponentName = useSelector(opponentNameView)
  const opponentScore = useSelector(opponentScoreView)
  const playerHasPermission = useSelector(getPlayerHasPermission)

  const blueText =
    playerColor === 'blue'
      ? `${playerName}: ${playerScore}`
      : `${opponentName}: ${opponentScore}`
  const redText =
    playerColor === 'red'
      ? `${playerName}: ${playerScore}`
      : `${opponentName}: ${opponentScore}`

  const isRedActive =
    playerColor === 'red'
      ? playerHasPermission
        ? true
        : false
      : playerHasPermission
      ? false
      : true

  return (
    <div className={classes.root}>
      <div
        className={clsx(
          classes.score,
          isRedActive ? classes.blue : classes.activeBlue,
        )}
      >
        <span>{blueText}</span>
      </div>
      <div
        className={clsx(
          classes.score,
          isRedActive ? classes.activeRed : classes.red,
        )}
      >
        <span>{redText}</span>
      </div>
    </div>
  )
}
