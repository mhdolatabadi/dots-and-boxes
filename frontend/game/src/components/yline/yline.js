import * as React from 'react'
// style
import useStyle from './yline.style'

import { useSelector } from 'react-redux'
import { playerColorView } from '../../scenes/_slice/game.slice'

export default function Yline({ i, j }) {
  const classes = useStyle()
  const playerColor = useSelector(playerColorView)

  const [backgroundColor, setBackgroundColor] = React.useState('')

  return (
    <div
      className={classes.root}
      style={{
        gridColumn: `${j}`,
        gridRow: `${i - 1} / ${i + 2}`,
        backgroundColor,
      }}
      onClick={() => {
        setBackgroundColor(playerColor)
      }}
    ></div>
  )
}
