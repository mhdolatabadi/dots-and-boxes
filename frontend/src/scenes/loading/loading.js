import * as React from 'react'
// style
import useStyle from './loading.style'
// localiztion
import t from './loading.local'

export default function LoadingPresentational(props) {
  const classes = useStyle()

  return (
    <div className={classes.root}>
      <img className={classes.icon} src="dotsandboxes.png" alt="dotsandboxes" />
      <span className={classes.message}>{t.message}</span>
      <span className={classes.version}>{t.version}</span>
    </div>
  )
}
