import clsx from 'clsx'
import useStyle from './line.style'
import { useDispatch, useSelector } from 'react-redux'

import {
  addNewLine,
  elementColorView,
  playerColorView,
  roomHasPermissionView,
  roomIsWaitingView,
  roomLastMoveView,
  setChanged,
  setPlayerLastMove,
  setRoomLastMove,
  themeView,
} from '../../../_slice/game.slice'
import { sendNewLine } from '../../../../services/backend/backend.service'

interface Props {
  i: number
  j: number
  type: string
}

export default function Line({ i, j, type }: Props) {
  const dispatch = useDispatch()

  const playerColor = useSelector(playerColorView)
  const classes = useStyle({ playerColor })

  const lineColor = useSelector(elementColorView(i, j))
  const isWaiting = useSelector(roomIsWaitingView)
  const hasPermission = useSelector(roomHasPermissionView)
  const lastMove = useSelector(roomLastMoveView)
  const { darkMode, richMode } = useSelector(themeView)

  const isLastMove = lastMove.i === i && lastMove.j === j

  return (
    <div
      className={clsx(
        classes.root,
        type === 'x' ? classes.xRoot : classes.yRoot,
        isLastMove
          ? darkMode && !richMode
            ? classes.lastMoveDark
            : classes.lastMoveLight
          : undefined,
        type === 'x' ? classes.xLastMove : classes.yLastMove,
      )}
      style={{
        gridColumn: type === 'x' ? `${j - 1} / ${j + 2}` : `${j}`,
        gridRow: type === 'x' ? `${i}` : `${i - 1} / ${i + 2}`,
        backgroundColor: lineColor,
      }}
      onClick={() => {
        if (!isWaiting && hasPermission && !lineColor) {
          sendNewLine(i, j, playerColor)
          dispatch(addNewLine({ i, j, color: playerColor }))
          dispatch(setPlayerLastMove({ i, j, color: playerColor }))
          dispatch(setRoomLastMove({ i, j, color: playerColor }))
          dispatch(setChanged(true))
        }
      }}
    ></div>
  )
}
