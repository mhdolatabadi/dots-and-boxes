import * as React from 'react'
// style
import useStyle from './loading.style'
// localiztion
import dict from './loading.local'
import useLocal from '../../setup/i18n/useLocal'

export default function LoadingPresentational(props) {
  const classes = useStyle()
  const t = useLocal(dict)

  return (
    <div className={classes.root}>
      <img className={classes.icon} src="dotsandboxes.png" alt="dotsandboxes" />
      <span className={classes.message}>{t.message}</span>
    </div>
  )
}
