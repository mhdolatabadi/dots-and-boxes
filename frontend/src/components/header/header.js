import * as React from 'react'
// style
import useStyle from './header.style'
// localiztion
import t from './header.local'
import { useSelector } from 'react-redux'
import { statusView } from '../../scenes/_slice/game.slice'

export default function Header({ type }) {
  const classes = useStyle()
  const status = useSelector(statusView)

  return (
    <div className={classes.root}>
      {type === 'game' ? t[status] : t.connected}
    </div>
  )
}
