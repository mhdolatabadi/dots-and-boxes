import { LinearProgress } from '@mui/material'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyle from './timer.style'
import {
  changedView,
  dispatchHasPermission,
  roomHasPermissionView,
  setChanged,
} from '../../../../slices/game.slice'

export default function Timer() {
  const classes = useStyle()
  const [progress, setProgress] = React.useState(0)
  const hasPermission = useSelector(roomHasPermissionView)
  const changed = useSelector(changedView)
  const dispatch = useDispatch()

  React.useEffect(() => {
    const timer = setInterval(() => {
      console.log(changed)
      setProgress(oldProgress => {
        if (oldProgress >= 100) {
          dispatchHasPermission(!hasPermission)
          return 0
        }
        return oldProgress + 3
      })
      if (changed) {
        dispatch(setChanged(false))
        setProgress(0)
      }
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  })

  return (
    <div className={classes.root}>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  )
}
