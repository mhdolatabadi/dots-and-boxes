import * as React from 'react'
// style
import useStyle from './button.style'
// localiztion
import t from './button.local'

export default function Button(props) {
  const classes = useStyle()

  return <div className={classes.root}>{t.name}</div>
}
