import * as React from 'react'
// style
import useStyle from './send-field.style'
// localiztion
import t from './send-field.local'

export default function SendField(props) {
  const classes = useStyle()

  return (
    <div className={classes.root}>
      <div class={classes.button}>
        <img alt="فرستادن" src="send-button.svg" className={classes.icon} />
      </div>
      <input className={classes.input} placeholder={t.placeholder} />
    </div>
  )
}
