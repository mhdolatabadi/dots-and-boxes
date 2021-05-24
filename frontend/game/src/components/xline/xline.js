import * as React from 'react'
// style
import useStyle from './xline.style'
import { useSelector } from 'react-redux'
import { playerColorView } from '../../scenes/_slice/game.slice'

export default function Xline({ i, j }) {
  const classes = useStyle()
  const playerColor = useSelector(playerColorView)
  const [backgroundColor, setBackgroundColor] = React.useState('')

  return (
    <div
      className={classes.root}
      style={{
        gridColumn: `${j - 1} / ${j + 2}`,
        gridRow: `${i}`,
        backgroundColor,
      }}
      onClick={() => {
        setBackgroundColor(playerColor)
      }}
    ></div>
  )
}
