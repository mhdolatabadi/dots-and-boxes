import * as React from 'react'
import { DOT_RADIUS, toWorld } from '../../grid3dLayout'

// A real sphere mesh -- looks correctly round from every angle and
// has genuine volume, so a rod approaching from any direction has
// something to actually plug into (no billboarding tricks needed).
export default function Dot3D({ x, y, z, size }) {
  return (
    <mesh
      position={[toWorld(x, size), toWorld(y, size), toWorld(z, size)]}
    >
      <sphereGeometry args={[DOT_RADIUS, 24, 16]} />
      <meshStandardMaterial color="#d7d9de" roughness={0.4} metalness={0.1} />
    </mesh>
  )
}
