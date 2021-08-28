import * as React from 'react'
// style
import useRichStyle from './score-board.rich.style'
import useDarkStyle from './score-board.dark.style'
import useLiteStyle from './score-board.lite.style'

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

export default function ScoreBoard({ theme }) {
  const richClasses = useRichStyle()
  const darkClasses = useDarkStyle()
  const liteClasses = useLiteStyle()
  const { darkMode, richMode } = theme
  const classes = richMode ? richClasses : darkMode ? darkClasses : liteClasses
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
