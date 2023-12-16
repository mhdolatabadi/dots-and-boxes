import * as React from 'react'
// style
import useStyle from './timer.style'
import { LinearProgress } from '@material-ui/core'
import {
  changedView,
  dispatchHasPermission,
  roomHasPermissionView,
  setChanged,
} from '../../../_slice/game.slice'
import { useDispatch, useSelector } from 'react-redux'

export default function Timer(props) {
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
