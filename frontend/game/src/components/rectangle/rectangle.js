import * as React from 'react'
// style
import useStyle from './rectangle.style'
// localiztion
import t from './rectangle.local'
import {
  elementColorView,
  getPlayerHasPermission,
  playerColorView,
} from '../../scenes/_slice/game.slice'
import { useSelector } from 'react-redux'
import { requestGift, sendBouns } from '../../services/backend/backend.service'

export default function Rectangle({ i, j, lastMove }) {
  const classes = useStyle()
  let lastLineColor
  const { i: lastI, j: lastJ, color: lastColor } = lastMove

  //TODO check wether rectangle is colored
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
  // if (i === 2 && j === 10) console.log(lastLineColor)

  const backgroundColor = background
    ? `dark${background}`
    : !!topLineColor && !!rightLineColor && !!leftLineColor && !!downLineColor
    ? `dark${lastLineColor}`
    : ''

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
    playerColor === lastColor
  ) {
    // console.log({ playerColor, lastColor, lastLineColor })
    sendBouns(i, j, playerColor)
  }
  return (
    <div
      className={classes.root}
      style={{
        gridColumn: `${j - 1} / ${j + 2}`,
        gridRow: `${i - 1} / ${i + 2}`,
        backgroundColor,
      }}
    >
      <span></span>
    </div>
  )
}
