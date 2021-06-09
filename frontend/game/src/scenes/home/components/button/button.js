import * as React from 'react'
// style
import useStyle from './button.style'
import cns from 'clsx'
// localiztion

export default function Button({ content, color }) {
  const classes = useStyle()

  return (
    <div className={classes.root}>
      <div className={classes.point}></div>
      <div
        className={cns(
          classes.line,
          color === 'blue' ? classes.blue : classes.red,
        )}
      >
        {content}
      </div>
      <div className={classes.point}></div>
    </div>
  )
}
