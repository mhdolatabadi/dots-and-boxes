import * as React from 'react'
// style
import useStyle from './body.style'
// localiztion
import t from './body.local'

const { W } = window

export default function Body(props) {
  const classes = useStyle()

  return (
    <div className={classes.root}>
      {/* <span className={classes.title}>درانتظار حریف...</span>
      <span>محمدحسین: ۰ - ۰ :نامشخص</span> */}
      <div
        className={classes.button}
        onClick={() => W.wappSystem.runWapp('main', '5f945d356cb1bf0d609c860a')}
      >
        {t.button}
      </div>
    </div>
  )
}
