import * as React from 'react'
// style
import useStyle from './information.style'

export default function Information(props) {
  const classes = useStyle()

  return (
    <div className={classes.root}>
      <a
        href="https://github.com/mhdolatabadi/dots-and-boxes"
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginTop: '7px' }}
      >
        <img className={classes.github} src="github.png" alt="github" />
      </a>
    </div>
  )
}
