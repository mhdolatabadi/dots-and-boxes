import * as React from 'react'
import { useSelector } from 'react-redux'
import useStyle from './edge3d.style'
import { toPx } from '../../grid3dLayout'
import { lineDisplayColor } from '../../../game/displayColor'
import {
  dispatchApplyMove3D,
  edges3DView,
  hasPermission3DView,
  playerColor3DView,
} from '../../../_slice/game3d.slice'
import { cubeKey, cubesCompletedBy, edgeKey } from '../../../../services/computer3d/grid3d'

export default function Edge3D({ a, b, size }) {
  const classes = useStyle()
  const edges = useSelector(edges3DView)
  const hasPermission = useSelector(hasPermission3DView)
  const playerColor = useSelector(playerColor3DView)

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

  return (
    <div
      className={classes.root}
      style={{
        transform: `translate3d(${toPx(mid.x, size)}px, ${toPx(
          mid.y,
          size,
        )}px, ${toPx(mid.z, size)}px) ${rotate}`,
        backgroundColor: color ? lineDisplayColor(color) : undefined,
      }}
      onClick={handleClick}
    />
  )
}
