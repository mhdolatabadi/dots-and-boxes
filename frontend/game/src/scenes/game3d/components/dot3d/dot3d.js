import * as React from 'react'
import useStyle from './dot3d.style'
import { toPx } from '../../grid3dLayout'

// A dot is drawn as a flat shaded disc (see dot3d.style.js) -- cheap,
// and a sphere's silhouette is a circle from every angle anyway. But a
// *flat* disc sitting in the scene's rotated 3D space rotates along
// with everything else, so past a certain drag angle it foreshortens
// edge-on and vanishes -- the lattice then reads as flat stacked
// sheets instead of a volume of balls. Countering the scene's current
// rotation here keeps the disc always facing the camera (a "billboard"),
// so it stays a circle no matter how the scene is rotated.
export default function Dot3D({ x, y, z, size, rotation }) {
  const classes = useStyle()

  return (
    <div
      className={classes.root}
      style={{
        transform: `translate3d(${toPx(x, size)}px, ${toPx(
          y,
          size,
        )}px, ${toPx(z, size)}px) rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg)`,
      }}
    />
  )
}
