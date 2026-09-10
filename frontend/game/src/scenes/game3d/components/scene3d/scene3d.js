import * as React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import useStyle from './scene3d.style'

// A real WebGL scene for the 3D board -- proper depth buffering and
// lighting instead of stacking flat CSS-transformed divs, which kept
// hitting new rendering artifacts (billboards that vanish edge-on,
// overlapping planes that flicker, rods that never quite look round).
// OrbitControls gives drag-to-rotate and scroll/pinch-to-zoom for
// free, so the scene no longer needs to track rotation/zoom itself.
export default function Scene3D({ children }) {
  const classes = useStyle()

  return (
    <div className={classes.viewport}>
      <Canvas camera={{ position: [3.4, 2.8, 4.2], fov: 45 }}>
        <color attach="background" args={['#1f2430']} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={0.9} />
        <directionalLight position={[-4, -2, -4]} intensity={0.25} />
        <OrbitControls
          enablePan={false}
          minDistance={2.5}
          maxDistance={12}
          rotateSpeed={0.7}
        />
        {children}
      </Canvas>
    </div>
  )
}
