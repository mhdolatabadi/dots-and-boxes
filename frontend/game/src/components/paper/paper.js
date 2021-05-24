import * as React from 'react'
// style
import useStyle from './paper.style'

// components
import Dot from '../dot'
import Xline from '../xline'
import Yline from '../yline'
import Rectangle from '../rectangle'

const createElements = () => {
  const elements = []
  for (let i = 1; i <= 2 * 6 - 1; i++)
    for (let j = 1; j <= 2 * 6 - 1; j++) {
      elements.push({ i, j })
    }
  return elements
}

export default function Paper(props) {
  const classes = useStyle()

  return (
    <div className={classes.root}>
      {createElements().map(({ i, j }) => {
        if ((i * j) % 2 === 1) return <Dot i={i} j={j} />
        else if (i % 2 === 1 && j % 2 !== 1) return <Xline i={i} j={j} />
        else if (i % 2 !== 1 && j % 2 === 1) return <Yline i={i} j={j} />
        else return <Rectangle i={i} j={j} />
      })}
    </div>
  )
}
