import * as React from 'react'
import useStyle from './cube3d.style'
import { CUBE_FILL_SIZE, toPx } from '../../grid3dLayout'
import { boxDisplayColor } from '../../../game/displayColor'

const half = CUBE_FILL_SIZE / 2

const FACE_TRANSFORMS = [
  `translateZ(${half}px)`,
  `rotateY(180deg) translateZ(${half}px)`,
  `rotateY(90deg) translateZ(${half}px)`,
  `rotateY(-90deg) translateZ(${half}px)`,
  `rotateX(90deg) translateZ(${half}px)`,
  `rotateX(-90deg) translateZ(${half}px)`,
]

// A completed unit cube, built from 6 positioned/rotated faces -- the
// standard CSS 3D "box" technique -- tinted with the claiming player's
// color and centered on the cube's cell.
export default function Cube3D({ x, y, z, size, color }) {
  const classes = useStyle()
  const center = { x: x + 0.5, y: y + 0.5, z: z + 0.5 }
  const backgroundColor = boxDisplayColor(color)

  return (
    <div
      className={classes.cube}
      style={{
        transform: `translate3d(${toPx(center.x, size)}px, ${toPx(
          center.y,
          size,
        )}px, ${toPx(center.z, size)}px)`,
      }}
    >
      {FACE_TRANSFORMS.map((transform, index) => (
        <div
          key={index}
          className={classes.face}
          style={{ transform, backgroundColor }}
        />
      ))}
    </div>
  )
}
