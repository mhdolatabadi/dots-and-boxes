import * as React from 'react'
// style
import useStyle from './header.style'
// localiztion
import t from './header.local'

export default function Header(props) {
  const classes = useStyle()

  return (
    <div className={classes.root}>
      <img className={classes.icon} src="dotsandboxes.png" />
      <span className={classes.title}>{t.title}</span>
      <div className={classes.subscribers}>
        <span>۳۴</span>
        <span className={classes.count}>تعداد تماشاچی‌ها</span>
      </div>
    </div>
  )
}
