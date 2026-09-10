import * as React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import useStyle from './scene3d.style'
import { UNIT } from '../../grid3dLayout'

// Direction the default camera looks from, before scaling by distance.
const CAMERA_DIRECTION = [3.4, 2.8, 4.2]
const DIRECTION_LENGTH = Math.hypot(...CAMERA_DIRECTION)

// A real WebGL scene for the 3D board -- proper depth buffering and
// lighting instead of stacking flat CSS-transformed divs, which kept
// hitting new rendering artifacts (billboards that vanish edge-on,
// overlapping planes that flicker, rods that never quite look round).
// OrbitControls gives drag-to-rotate and scroll/pinch-to-zoom for
// free, so the scene no longer needs to track rotation/zoom itself.
//
// The board size is configurable (same size picker as the 2D game),
// so the camera can't sit at a fixed distance -- an 8x8x8 lattice is
// physically much bigger than the default 3x3x3 one, and a fixed
// camera tuned for the small case ends up sitting *inside* the large
// one. Distance and zoom limits scale with the lattice's span instead.
export default function Scene3D({ size, children }) {
  const classes = useStyle()

  const span = (size - 1) * UNIT
  const distance = span * 1.15 + 3
  const cameraPosition = CAMERA_DIRECTION.map(
    v => (v / DIRECTION_LENGTH) * distance,
  )

  return (
    <div className={classes.viewport}>
      <Canvas camera={{ position: cameraPosition, fov: 45 }}>
        <color attach="background" args={['#1f2430']} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={0.9} />
        <directionalLight position={[-4, -2, -4]} intensity={0.25} />
        <OrbitControls
          enablePan={false}
          minDistance={Math.max(2.5, span * 0.4)}
          maxDistance={distance * 3}
          rotateSpeed={0.7}
        />
        {children}
      </Canvas>
    </div>
  )
}
