import * as React from 'react'
// style
import useStyle from './rectangle.style'
// localiztion
import t from './rectangle.local'

export default function Rectangle({ i, j }) {
  const classes = useStyle()

  return (
    <div
      className={classes.root}
      style={{
        gridColumn: `${j - 1} / ${j + 2}`,
        gridRow: `${i - 1} / ${i + 2}`,
      }}
    ></div>
  )
}
