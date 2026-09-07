import * as React from 'react'
import useStyle from './dot3d.style'
import { toPx } from '../../grid3dLayout'

export default function Dot3D({ x, y, z, size }) {
  const classes = useStyle()

  return (
    <div
      className={classes.root}
      style={{
        transform: `translate3d(${toPx(x, size)}px, ${toPx(
          y,
          size,
        )}px, ${toPx(z, size)}px)`,
      }}
    />
  )
}
