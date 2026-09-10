import * as React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { EDGE_LENGTH, EDGE_RADIUS, toWorld } from '../../grid3dLayout'
import { lineDisplayColor } from '../../../game/displayColor'
import {
  dispatchApplyMove3D,
  edges3DView,
  hasPermission3DView,
  playerColor3DView,
} from '../../../_slice/game3d.slice'
import {
  cubeKey,
  cubesCompletedBy,
  edgeKey,
} from '../../../../services/computer3d/grid3d'

const UNDRAWN_COLOR = '#4a4f5c'
const HOVER_COLOR = '#8a91a3'

// CylinderGeometry's default axis is Y -- rotate it onto whichever
// axis this particular edge actually runs along. Exactly one of a/b's
// coordinates differs (by 1), so exactly one of these branches fires.
const rotationFor = (a, b) => {
  if (a.x !== b.x) return [0, 0, Math.PI / 2]
  if (a.z !== b.z) return [Math.PI / 2, 0, 0]
  return [0, 0, 0]
}

export default function Edge3D({ a, b, size }) {
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
  const position = [toWorld(mid.x, size), toWorld(mid.y, size), toWorld(mid.z, size)]
  const rotation = rotationFor(a, b)

  const handleClick = e => {
    e.stopPropagation()
    if (!hasPermission || color) return
    const completedCubeKeys = cubesCompletedBy(edges, { a, b }, size).map(
      cubeKey,
    )
    dispatchApplyMove3D(key, playerColor, completedCubeKeys)
  }

  const displayColor = color
    ? lineDisplayColor(color)
    : hovered
    ? HOVER_COLOR
    : UNDRAWN_COLOR

  return (
    <mesh
      position={position}
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={e => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
    >
      <cylinderGeometry args={[EDGE_RADIUS, EDGE_RADIUS, EDGE_LENGTH, 16]} />
      <meshStandardMaterial
        color={displayColor}
        roughness={0.45}
        metalness={0.1}
      />
    </mesh>
  )
}
