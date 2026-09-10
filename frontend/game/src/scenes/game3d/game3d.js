import * as React from 'react'
import { useSelector } from 'react-redux'
import useStyle from './game3d.style'
import Header from '../../components/header/header'
import Scene3D from './components/scene3d'
import Dot3D from './components/dot3d'
import Edge3D from './components/edge3d'
import Cube3D from './components/cube3d'
import ScoreBoard3D from './components/score-board3d'
import {
  cubes3DView,
  size3DView,
  winner3DView,
} from '../_slice/game3d.slice'
import { dispatchGameMode } from '../_slice/game.slice'
import { getAllEdges } from '../../services/computer3d/grid3d'

export default function Game3D() {
  const classes = useStyle()
  const size = useSelector(size3DView)
  const cubes = useSelector(cubes3DView)
  const winner = useSelector(winner3DView)

  const dots = []
  for (let x = 0; x < size; x++)
    for (let y = 0; y < size; y++)
      for (let z = 0; z < size; z++) dots.push({ x, y, z })

  const edges = getAllEdges(size)

  const cubeCells = []
  for (let x = 0; x < size - 1; x++)
    for (let y = 0; y < size - 1; y++)
      for (let z = 0; z < size - 1; z++) cubeCells.push({ x, y, z })

  const winnerText = !winner
    ? null
    : winner.draw
    ? 'مساوی شد!'
    : winner.color === 'red'
    ? 'شما بردید! 🎉'
    : 'کامپیوتر برد.'

  return (
    <div className={classes.root}>
      <Header type="menu" />
      <ScoreBoard3D />

      <Scene3D>
        {dots.map(d => (
          <Dot3D key={`d-${d.x}-${d.y}-${d.z}`} {...d} size={size} />
        ))}
        {edges.map(e => (
          <Edge3D
            key={`e-${e.a.x}${e.a.y}${e.a.z}-${e.b.x}${e.b.y}${e.b.z}`}
            a={e.a}
            b={e.b}
            size={size}
          />
        ))}
        {cubeCells.map(c => {
          const key = `${c.x},${c.y},${c.z}`
          const color = cubes[key]
          return color ? (
            <Cube3D key={key} {...c} size={size} color={color} />
          ) : null
        })}
      </Scene3D>

      <span className={classes.hint}>
        برای چرخوندن صحنه بکش؛ برای زوم، اسکرول کن یا با دو انگشت پینچ کن.
        برای کشیدن خط، روی یکی از میله‌های خاکستری بین نقطه‌ها کلیک کن.
      </span>

      {winnerText && <div className={classes.winnerBanner}>{winnerText}</div>}

      <div
        className={classes.backButton}
        onClick={() => dispatchGameMode('menu')}
      >
        بازگشت به منو
      </div>
    </div>
  )
}
