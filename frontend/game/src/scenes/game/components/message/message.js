import * as React from 'react'
// style
import useStyle from './message.style'
// localiztion

export default function Message({ type, content }) {
  const classes = useStyle()
  const direction = type === 'sended' ? 'rtl' : 'ltr'
  return (
    <div className={classes.root} style={{ direction }}>
      <div className={classes[type]}>
        <span>{content}</span>
      </div>
    </div>
  )
}
