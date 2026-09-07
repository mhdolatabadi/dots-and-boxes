import * as React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import useStyle from './edge3d.style'
import { EDGE_RADIUS, EDGE_SEGMENTS, toPx } from '../../grid3dLayout'
import { lineDisplayColor } from '../../../game/displayColor'
import {
  dispatchApplyMove3D,
  edges3DView,
  hasPermission3DView,
  playerColor3DView,
} from '../../../_slice/game3d.slice'
import { cubeKey, cubesCompletedBy, edgeKey } from '../../../../services/computer3d/grid3d'

// Angle (around the rod's own axis) the shading treats as "lit" --
// arbitrary, just needs to be consistent so the rod reads as
// consistently round rather than randomly speckled.
const LIGHT_ANGLE = 55

const STAVE_ANGLES = Array.from(
  { length: EDGE_SEGMENTS },
  (_, i) => (360 / EDGE_SEGMENTS) * i,
)

export default function Edge3D({ a, b, size }) {
  const classes = useStyle()
  const edges = useSelector(edges3DView)
  const hasPermission = useSelector(hasPermission3DView)
  const playerColor = useSelector(playerColor3DView)
  const [hovered, setHovered] = useState(false)

  const key = edgeKey(a, b)
  const color = edges[key]

  const mid = {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
    z: (a.z + b.z) / 2,
  }

  let rotate = ''
  if (a.y !== b.y) rotate = 'rotateZ(90deg)'
  else if (a.z !== b.z) rotate = 'rotateY(90deg)'

  const handleClick = () => {
    if (!hasPermission || color) return
    const completedCubeKeys = cubesCompletedBy(edges, { a, b }, size).map(
      cubeKey,
    )
    dispatchApplyMove3D(key, playerColor, completedCubeKeys)
  }

  const baseColor = color
    ? lineDisplayColor(color)
    : hovered
    ? 'rgba(255, 255, 255, 0.22)'
    : 'rgba(255, 255, 255, 0.06)'

  return (
    <div
      className={classes.root}
      style={{
        transform: `translate3d(${toPx(mid.x, size)}px, ${toPx(
          mid.y,
          size,
        )}px, ${toPx(mid.z, size)}px) ${rotate}`,
      }}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {STAVE_ANGLES.map(angle => {
        const brightness =
          0.55 + 0.55 * Math.cos(((angle - LIGHT_ANGLE) * Math.PI) / 180)
        return (
          <div
            key={angle}
            className={classes.stave}
            style={{
              transform: `rotateX(${angle}deg) translateZ(${EDGE_RADIUS}px)`,
              backgroundColor: baseColor,
              filter: `brightness(${brightness.toFixed(2)})`,
            }}
          />
        )
      })}
    </div>
  )
}
