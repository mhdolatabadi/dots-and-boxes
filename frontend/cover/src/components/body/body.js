import * as React from 'react'
// style
import useStyle from './body.style'

export default function Body(props) {
  const classes = useStyle()

  return (
    <div className={classes.root}>
      <span className={classes.title}>درانتظار حریف...</span>
      <span>محمدحسین: ۰ - ۰ :نامشخص</span>
      <div className={classes.button}>شرکت در بازی</div>
    </div>
  )
}
