import useStyle from './loading.style'
import t from './loading.local'

export default function LoadingPresentational() {
  const classes = useStyle()

  return (
    <div className={classes.root}>
      <img className={classes.icon} src="/assets/image/dotsandboxes.png" alt="dotsandboxes" />
      <span className={classes.message}>{t.message}</span>
      <span className={classes.version}>{t.version}</span>
    </div>
  )
}
