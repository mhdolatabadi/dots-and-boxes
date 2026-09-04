import * as React from 'react'
import { useEffect } from 'react'
// style
import useStyle from './rectangle.style'
// localiztion

import { useSelector } from 'react-redux'
import { sendBonus } from '../../../../services/backend/backend.service'
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

  const isBoxSurrounded =
    !!topLineColor && !!rightLineColor && !!leftLineColor && !!downLineColor
  const backgroundColor = background
    ? background
    : isBoxSurrounded
    ? lastLineColor
    : ''
  const isAdjacentToLastMove =
    (i - 1 === lastI && j === lastJ) ||
    (i + 1 === lastI && j === lastJ) ||
    (i === lastI && j - 1 === lastJ) ||
    (i === lastI && j + 1 === lastJ)

  // Claiming a completed box is a side effect (redux dispatch, a socket
  // emit), so it belongs in an effect rather than directly in render --
  // dispatching mid-render triggers React's "Cannot update a component
  // while rendering a different component" warning.
  useEffect(() => {
    if (background || !backgroundColor) return
    dispatch(addNewLine({ i, j, color: backgroundColor }))

    if (isAdjacentToLastMove && isBoxSurrounded && !playerHasPermission) {
      if (playerColor === lastColor) {
        dispatch(increasePlayerScore())
        sendBonus(i, j, playerColor)
      } else dispatch(increaseOpponentScore())
    }
  }, [
    i,
    j,
    background,
    backgroundColor,
    isAdjacentToLastMove,
    isBoxSurrounded,
    playerHasPermission,
    playerColor,
    lastColor,
  ])

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
