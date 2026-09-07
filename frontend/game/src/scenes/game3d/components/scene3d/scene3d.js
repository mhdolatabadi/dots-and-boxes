import * as React from 'react'
import { useRef, useState } from 'react'
import useStyle from './scene3d.style'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

// Perspective viewport for the 3D board -- lets the player drag to orbit
// the lattice, since a fixed camera angle would leave far edges/cubes
// occluded on anything bigger than a handful of dots.
export default function Scene3D({ children }) {
  const classes = useStyle()
  const [rotation, setRotation] = useState({ x: -22, y: -32 })
  const dragRef = useRef(null)

  const startDrag = (clientX, clientY) => {
    dragRef.current = { x: clientX, y: clientY, from: rotation }
  }

  const continueDrag = (clientX, clientY) => {
    if (!dragRef.current) return
    const dx = clientX - dragRef.current.x
    const dy = clientY - dragRef.current.y
    setRotation({
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
