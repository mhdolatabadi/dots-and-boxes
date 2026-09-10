import * as React from 'react'
import { useEffect, useRef } from 'react'
import useStyle from './scene3d.style'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

// Perspective viewport for the 3D board -- lets the player drag to orbit
// the lattice, since a fixed camera angle would leave far edges/cubes
// occluded on anything bigger than a handful of dots. Rotation state
// lives in the parent (Game3D) rather than here, because Dot3D also
// needs it to counter-rotate itself back to facing the camera -- see
// dot3d.js for why. Zoom lives there too, for the same
// single-source-of-truth reason (nothing else currently needs it, but
// keeping both view-state values in one place avoids splitting the
// "camera" across two components for no reason).
export default function Scene3D({ rotation, onRotate, zoom, onZoom, children }) {
  const classes = useStyle()
  const dragRef = useRef(null)
  const viewportRef = useRef(null)

  // React's synthetic onWheel is registered as a passive listener, so
  // calling preventDefault() inside it throws -- the browser's own page
  // scroll would otherwise fight with zooming the scene. A real
  // listener with passive:false is the only way to actually block it.
  // onZoom is a plain setState setter, so the functional-update form
  // keeps this effect's dependency list empty (attach once) without
  // reading a stale `zoom` value.
  useEffect(() => {
    const node = viewportRef.current
    if (!node) return

    const handleWheel = e => {
      e.preventDefault()
      onZoom(prev => clamp(prev - e.deltaY * 0.0015, 0.5, 3))
    }

    node.addEventListener('wheel', handleWheel, { passive: false })
    return () => node.removeEventListener('wheel', handleWheel)
  }, [onZoom])

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
      ref={viewportRef}
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
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${zoom}, ${zoom}, ${zoom})`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
