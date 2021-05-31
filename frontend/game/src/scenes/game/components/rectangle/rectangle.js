import * as React from 'react'
// style
import useStyle from './rectangle.style'
// localiztion

import { useSelector } from 'react-redux'
import { sendBouns } from '../../../../services/backend/backend.service'
import { dispatch } from '../../../../setup/store/store'
import {
  addNewLine,
  elementColorView,
  getPlayerHasPermission,
  increaseOpponentScore,
  increasePlayerScore,
  playerColorView,
} from '../../../_slice/game.slice'

export default function Rectangle({ i, j, lastMove, paperSize }) {
  const classes = useStyle()
  let lastLineColor
  const { i: lastI, j: lastJ, color: lastColor } = lastMove

  const playerHasPermission = useSelector(getPlayerHasPermission)
  const playerColor = useSelector(playerColorView)

  const topLineColor = useSelector(elementColorView(i - 1, j))
  const rightLineColor = useSelector(elementColorView(i, j + 1))
  const leftLineColor = useSelector(elementColorView(i, j - 1))
  const downLineColor = useSelector(elementColorView(i + 1, j))

  const background = useSelector(elementColorView(i, j))

  if (i - 1 === lastI && j === lastJ) lastLineColor = topLineColor || ''
  if (i + 1 === lastI && j === lastJ) lastLineColor = downLineColor || ''
  if (i === lastI && j - 1 === lastJ) lastLineColor = leftLineColor || ''
  if (i === lastI && j + 1 === lastJ) lastLineColor = rightLineColor || ''

  const backgroundColor = background
    ? background
    : !!topLineColor && !!rightLineColor && !!leftLineColor && !!downLineColor
    ? lastLineColor
    : ''
  if (!background && backgroundColor) {
    dispatch(addNewLine({ i, j, color: backgroundColor }))
  }

  if (
    ((i - 1 === lastI && j === lastJ) ||
      (i + 1 === lastI && j === lastJ) ||
      (i === lastI && j - 1 === lastJ) ||
      (i === lastI && j + 1 === lastJ)) &&
    !background &&
    !!topLineColor &&
    !!rightLineColor &&
    !!leftLineColor &&
    !!downLineColor &&
    !playerHasPermission
  ) {
    if (playerColor === lastColor) {
      dispatch(increasePlayerScore())
      sendBouns(i, j, playerColor)
    } else dispatch(increaseOpponentScore())
  }

  return (
    <div
      className={classes.root}
      style={{
        gridColumn: `${j - 1} / ${j + 2}`,
        gridRow: `${i - 1} / ${i + 2}`,
        backgroundColor: `dark${backgroundColor}`,
      }}
    >
      <span></span>
    </div>
  )
}
