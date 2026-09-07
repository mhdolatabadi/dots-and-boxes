import * as React from 'react'
import { useRef } from 'react'
import useStyle from './scene3d.style'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

// Perspective viewport for the 3D board -- lets the player drag to orbit
// the lattice, since a fixed camera angle would leave far edges/cubes
// occluded on anything bigger than a handful of dots. Rotation state
// lives in the parent (Game3D) rather than here, because Dot3D also
// needs it to counter-rotate itself back to facing the camera -- see
// dot3d.js for why.
export default function Scene3D({ rotation, onRotate, children }) {
  const classes = useStyle()
  const dragRef = useRef(null)

  const startDrag = (clientX, clientY) => {
    dragRef.current = { x: clientX, y: clientY, from: rotation }
  }

  const continueDrag = (clientX, clientY) => {
    if (!dragRef.current) return
    const dx = clientX - dragRef.current.x
    const dy = clientY - dragRef.current.y
    onRotate({
      x: clamp(dragRef.current.from.x - dy * 0.4, -85, 10),
      y: dragRef.current.from.y + dx * 0.4,
    })
  }

  const endDrag = () => {
    dragRef.current = null
  }

  return (
    <div
      className={classes.viewport}
      onPointerDown={e => startDrag(e.clientX, e.clientY)}
      onPointerMove={e => continueDrag(e.clientX, e.clientY)}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
    >
      <div
        className={classes.world}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
