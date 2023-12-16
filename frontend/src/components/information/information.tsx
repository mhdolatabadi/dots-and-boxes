import useStyle from './information.style'

export default function Information() {
  const classes = useStyle()

  return (
    <div className={classes.root}>
      <a
        href="https://github.com/mhdolatabadi/noghte-bazi"
        target="_blank"
        style={{ marginTop: '7px' }}
      >
        <img className={classes.github} src="github.png" alt="github" />
      </a>
    </div>
  )
}
