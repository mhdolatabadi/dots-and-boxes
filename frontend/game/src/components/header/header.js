import * as React from 'react'
// style
import useStyle from './header.style'
// localiztion
import t from './header.local'

export default function Header(props) {
  const classes = useStyle()

  return <div className={classes.root}>{t.title}</div>
}
