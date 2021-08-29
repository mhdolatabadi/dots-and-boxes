import * as React from 'react'
// style
import useStyle from './yline.style'

import { useDispatch, useSelector } from 'react-redux'

import { sendNewLine } from '../../../../services/backend/backend.service'
import {
  addNewLine,
  elementColorView,
  playerColorView,
  roomHasPermissionView,
  roomIsWaitingView,
  setPlayerLastMove,
  setRoomLastMove,
} from '../../../_slice/game.slice'

export default function Yline({ i, j }) {
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
        gridColumn: `${j}`,
        gridRow: `${i - 1} / ${i + 2}`,
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
