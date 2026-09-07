import * as React from 'react'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import useStyle from './score-board3d.style'
import {
  hasPermission3DView,
  opponentScore3DView,
  playerColor3DView,
  playerScore3DView,
} from '../../../_slice/game3d.slice'
import { COMPUTER_NAME } from '../../../../services/computer/computer.service'

export default function ScoreBoard3D() {
  const classes = useStyle()
  const playerColor = useSelector(playerColor3DView)
  const playerScore = useSelector(playerScore3DView)
  const opponentScore = useSelector(opponentScore3DView)
  const hasPermission = useSelector(hasPermission3DView)

  const isRedActive = playerColor === 'red' ? hasPermission : !hasPermission

  const blueText =
    playerColor === 'blue'
      ? `شما: ${playerScore}`
      : `${COMPUTER_NAME}: ${opponentScore}`
  const redText =
    playerColor === 'red'
      ? `شما: ${playerScore}`
      : `${COMPUTER_NAME}: ${opponentScore}`

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
