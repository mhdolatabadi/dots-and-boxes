import * as React from 'react'
import useStyle from './dot3d.style'
import { toPx } from '../../grid3dLayout'

// A sphere approximated by three mutually perpendicular flat discs
// sharing the same center: one billboarded to face the camera (reads
// as a smoothly lit ball from the angles a player actually looks
// from -- a flat disc's silhouette is a circle from any direction,
// which is exactly a sphere's silhouette too), and two more fixed to
// the scene's own rotation instead of the camera.
//
// The other two exist purely to give the dot real volume along axes
// the billboard alone has none in. A flat disc has zero depth in the
// direction it's facing -- so a rod approaching from close to the
// camera's own viewing angle has nothing of the ball to visually sink
// into there, and looks like it stops short of it instead of plugging
// in, even though the position math is correct. Two more discs at
// right angles (not billboarded, so they keep real extent along the
// axes the camera-facing one is flat against) fix that.
export default function Dot3D({ x, y, z, size, rotation }) {
  const classes = useStyle()

  return (
    <div
      className={classes.wrapper}
      style={{
        transform: `translate3d(${toPx(x, size)}px, ${toPx(
          y,
          size,
        )}px, ${toPx(z, size)}px)`,
      }}
    >
      <div
        className={classes.face}
        style={{
          transform: `rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg)`,
        }}
      />
      <div className={classes.face} style={{ transform: 'rotateY(90deg)' }} />
      <div className={classes.face} style={{ transform: 'rotateX(90deg)' }} />
    </div>
  )
}
