import * as React from 'react'
// style
import useStyle from './xline.style'
import { useDispatch, useSelector } from 'react-redux'

import {
  addNewLine,
  elementColorView,
  playerColorView,
  roomHasPermissionView,
  roomIsWaitingView,
  setPlayerLastMove,
  setRoomLastMove,
} from '../../../_slice/game.slice'
import { sendNewLine } from '../../../../services/backend/backend.service'

export default function Xline({ i, j }) {
  const dispatch = useDispatch()

  const playerColor = useSelector(playerColorView)
  const classes = useStyle(playerColor)

  const lineColor = useSelector(elementColorView(i, j))
  const isWaiting = useSelector(roomIsWaitingView)
  const hasPermission = useSelector(roomHasPermissionView)

  return (
    <div
      className={classes.root}
      style={{
        gridColumn: `${j - 1} / ${j + 2}`,
        gridRow: `${i}`,
        backgroundColor: lineColor,
      }}
      onClick={() => {
        if (!isWaiting && hasPermission && !lineColor) {
          sendNewLine(i, j, playerColor)
          dispatch(addNewLine({ i, j, color: playerColor }))
          dispatch(setPlayerLastMove({ i, j, color: playerColor }))
          dispatch(setRoomLastMove({ i, j, color: playerColor }))
        }
      }}
    ></div>
  )
}
