import * as React from 'react'
import useStyle from './dot3d.style'
import { DOT_SIZE, toPx } from '../../grid3dLayout'

const half = DOT_SIZE / 2

// Same 6-faces-of-a-box technique as cube3d.js's completed-cube fill,
// just small and round-faced instead of large and square-faced. A
// billboarded flat disc (the previous approach) looks right from the
// camera but has zero depth in every other direction, so a rod
// approaching from anywhere but nearly face-on has nothing to sink
// into and looks like it stops short of the ball. A tried-and-tested
// approach (three overlapping discs sharing one center, all fixed at
// slightly different angles) fixed the occlusion gap but introduced a
// worse problem: fully-overlapping opaque planes at nearly the same
// position have no defined stacking order in CSS's z-buffer-less 3D
// rendering, so the browser flickers between them pixel by pixel,
// showing up as a jagged, gear-like silhouette instead of a circle.
// Six faces of an actual box, touching only at their edges like a
// real cube, never overlap at all -- no ambiguous depth, no
// artifact -- and with rounded (circular) faces the result reads as
// a ball from any angle, the same way cube3d.js's square faces read
// as a box.
const FACE_TRANSFORMS = [
  `translateZ(${half}px)`,
  `rotateY(180deg) translateZ(${half}px)`,
  `rotateY(90deg) translateZ(${half}px)`,
  `rotateY(-90deg) translateZ(${half}px)`,
  `rotateX(90deg) translateZ(${half}px)`,
  `rotateX(-90deg) translateZ(${half}px)`,
]

export default function Dot3D({ x, y, z, size }) {
  const classes = useStyle()

  return (
    <div
      className={classes.cube}
      style={{
        transform: `translate3d(${toPx(x, size)}px, ${toPx(
          y,
          size,
        )}px, ${toPx(z, size)}px)`,
      }}
    >
      {FACE_TRANSFORMS.map((transform, index) => (
        <div key={index} className={classes.face} style={{ transform }} />
      ))}
    </div>
  )
}
