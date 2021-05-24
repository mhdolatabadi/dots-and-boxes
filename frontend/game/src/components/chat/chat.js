import * as React from 'react'
// style
import useStyle from './chat.style'
// localiztion
import t from './chat.local'

export default function Chat(props) {
  const classes = useStyle()

  return <div className={classes.root}>{t.name}</div>
}
