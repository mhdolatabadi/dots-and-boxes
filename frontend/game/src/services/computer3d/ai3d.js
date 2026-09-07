// Heuristic move selection for the 3D vs-computer opponent -- the exact
// same strategy as the 2D AI (services/computer/ai.js), generalized from
// boxes/lines to cubes/edges: take a free cube if one is available,
// otherwise play a move that doesn't leave any cube one edge from
// completion, and only concede one when every remaining move would.

import {
  cubesCompletedBy,
  getAllEdges,
  isEdgeDrawn,
  isUnsafe,
} from './grid3d'

const randomOf = list => list[Math.floor(Math.random() * list.length)]

// Returns { edge: { a, b }, completes: [cube, ...] } or null once the
// lattice is full.
export const chooseMove3D = (edges, size) => {
  const candidates = getAllEdges(size).filter(
    edge => !isEdgeDrawn(edges, edge),
  )
  if (candidates.length === 0) return null

  const scored = candidates.map(edge => ({
    edge,
    completes: cubesCompletedBy(edges, edge, size),
  }))

  const completing = scored.filter(s => s.completes.length > 0)
  if (completing.length > 0) {
    const most = Math.max(...completing.map(s => s.completes.length))
    return randomOf(completing.filter(s => s.completes.length === most))
  }

  const safe = candidates.filter(edge => !isUnsafe(edges, edge, size))
  if (safe.length > 0) return { edge: randomOf(safe), completes: [] }

  return { edge: randomOf(candidates), completes: [] }
}
