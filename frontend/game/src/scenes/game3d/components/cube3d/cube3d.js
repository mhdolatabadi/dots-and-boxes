import * as React from 'react'
import { CUBE_FILL_SIZE, toWorld } from '../../grid3dLayout'
import { lineDisplayColor } from '../../../game/displayColor'

// A completed unit cube -- a real translucent box mesh centered on
// the cube's cell, tinted with the claiming player's color.
export default function Cube3D({ x, y, z, size, color }) {
  const center = { x: x + 0.5, y: y + 0.5, z: z + 0.5 }
  const position = [
    toWorld(center.x, size),
    toWorld(center.y, size),
    toWorld(center.z, size),
  ]

  return (
    <mesh position={position}>
      <boxGeometry args={[CUBE_FILL_SIZE, CUBE_FILL_SIZE, CUBE_FILL_SIZE]} />
      <meshStandardMaterial
        color={lineDisplayColor(color)}
        transparent
        opacity={0.6}
        roughness={0.3}
      />
    </mesh>
  )
}
