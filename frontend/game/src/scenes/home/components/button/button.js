import * as React from 'react'
// style
import useStyle from './button.style'
// localiztion

export default function Button({ content, color }) {
  const classes = useStyle()

  return (
    <div className={classes.root}>
      <div className={classes.point}></div>
      <div className={classes.line} style={{ backgroundColor: color }}>
        {content}
      </div>
      <div className={classes.point}></div>
    </div>
  )
}
