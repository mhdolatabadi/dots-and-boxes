import * as React from 'react'
// style
import useStyle from './dot.style'
// localiztion
import t from './dot.local'

export default function Dot({ i, j }) {
  const classes = useStyle()

  return (
    <div
      className={classes.root}
      style={{ gridColumn: `${i}`, gridRow: `${j}` }}
    ></div>
  )
}
