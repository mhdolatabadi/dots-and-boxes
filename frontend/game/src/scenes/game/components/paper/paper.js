import * as React from 'react'
// style
import useStyle from './paper.style'

// components
import Dot from '../dot'
import Xline from '../xline'
import Yline from '../yline'
import Rectangle from '../rectangle'
import { useDispatch, useSelector } from 'react-redux'
import {
  opponentColorView,
  opponentIdView,
  opponentScoreView,
  paperColumnNumberView,
  paperRowNumberView,
  playerColorView,
  playerIdView,
  playerScoreView,
  roomLastMoveView,
  setRoomWinner,
} from '../../../_slice/game.slice'

const createElements = (rowNumber, columnNumber) => {
  const elements = []
  for (let i = 1; i <= 2 * rowNumber - 1; i++)
    for (let j = 1; j <= 2 * columnNumber - 1; j++) {
      elements.push({ i, j })
    }
  return elements
}

export default function Paper() {
  const classes = useStyle()
  const roomLastMove = useSelector(roomLastMoveView)
  const rowNumber = useSelector(paperRowNumberView)
  const columnNumber = useSelector(paperColumnNumberView)

  return (
    <div className={classes.root}>
      {createElements(rowNumber, columnNumber).map(({ i, j }) => {
        if ((i * j) % 2 === 1) return <Dot i={i} j={j} key={`${i}-${j}`} />
        else if (i % 2 === 1 && j % 2 !== 1)
          return <Xline i={i} j={j} key={`${i}-${j}`} />
        else if (i % 2 !== 1 && j % 2 === 1)
          return <Yline i={i} j={j} key={`${i}-${j}`} />
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
