import * as React from 'react'
// style
import useStyle from './information.style'
// localiztion
import t from './information.local'

export default function Information(props) {
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
