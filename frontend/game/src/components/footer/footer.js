import * as React from 'react'
// style
import useStyle from './footer.style'
// localiztion
import t from './footer.local'

export default function Footer(props) {
  const classes = useStyle()

  return <div className={classes.root}></div>
}
