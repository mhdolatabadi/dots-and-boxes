import * as React from 'react'

import cns from 'clsx'
// style
import useStyle from './paper.style'

// components
import Dot from '../dot'
import Rectangle from '../rectangle'
import { useSelector } from 'react-redux'
import {
  paperColumnNumberView,
  paperRowNumberView,
  roomLastMoveView,
} from '../../../_slice/game.slice'
import { type } from 'ramda'
import Line from '../line/line'

const createElements = (rowNumber, columnNumber) => {
  const elements = []
  for (let i = 1; i <= 2 * rowNumber - 1; i++)
    for (let j = 1; j <= 2 * columnNumber - 1; j++) {
      elements.push({ i, j })
    }
  return elements
}

export default function Paper({ theme }) {
  const classes = useStyle()
  const roomLastMove = useSelector(roomLastMoveView)
  const rowNumber = useSelector(paperRowNumberView)
  const columnNumber = useSelector(paperColumnNumberView)
  const { darkMode, richMode } = theme

  return (
    <div
      className={cns(
        classes.root,
        richMode
          ? classes['rich']
          : darkMode
          ? classes['dark']
          : classes['lite'],
      )}
    >
      {createElements(rowNumber, columnNumber).map(({ i, j }) => {
        if ((i * j) % 2 === 1)
          return <Dot i={i} j={j} key={`${i}-${j}`} theme={theme} />
        else if (i % 2 === 1 && j % 2 !== 1)
          return <Line i={i} j={j} key={`${i}-${j}`} type="x" />
        else if (i % 2 !== 1 && j % 2 === 1)
          return <Line i={i} j={j} key={`${i}-${j}`} type="y" />
        else
          return (
            <Rectangle
              i={i}
              j={j}
              lastMove={roomLastMove}
              key={`${i}-${j}`}
              paperSize={rowNumber}
            />
          )
      })}
    </div>
  )
}
