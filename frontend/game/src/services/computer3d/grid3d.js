// Pure, framework-free geometry and rules for the 3D "dots and cubes"
// mode -- the literal 3D extension of the 2D game: a size x size x size
// lattice of dots, edges connecting adjacent dots along one axis, and a
// unit cube claimed once all 12 of its bordering edges are drawn.

const corner = ({ x, y, z }) => `${x},${y},${z}`

// Canonical key for an edge -- independent of which endpoint is passed
// as `a` vs `b`.
export const edgeKey = (a, b) => {
  const [p, q] =
    a.x !== b.x
      ? a.x < b.x
        ? [a, b]
        : [b, a]
      : a.y !== b.y
      ? a.y < b.y
        ? [a, b]
        : [b, a]
      : a.z < b.z
      ? [a, b]
      : [b, a]
  return `${corner(p)}-${corner(q)}`
}

export const cubeKey = corner

// Every edge of the lattice, each direction counted once.
export const getAllEdges = size => {
  const edges = []
  for (let x = 0; x < size; x++)
    for (let y = 0; y < size; y++)
      for (let z = 0; z < size; z++) {
        if (x + 1 < size) edges.push({ a: { x, y, z }, b: { x: x + 1, y, z } })
        if (y + 1 < size) edges.push({ a: { x, y, z }, b: { x, y: y + 1, z } })
        if (z + 1 < size) edges.push({ a: { x, y, z }, b: { x, y, z: z + 1 } })
      }
  return edges
}

// The 12 edges bordering the unit cube whose minimum corner is (x,y,z).
export const getCubeEdges = ({ x, y, z }) => [
  { a: { x, y, z }, b: { x: x + 1, y, z } },
  { a: { x, y: y + 1, z }, b: { x: x + 1, y: y + 1, z } },
  { a: { x, y, z: z + 1 }, b: { x: x + 1, y, z: z + 1 } },
  { a: { x, y: y + 1, z: z + 1 }, b: { x: x + 1, y: y + 1, z: z + 1 } },
  { a: { x, y, z }, b: { x, y: y + 1, z } },
  { a: { x: x + 1, y, z }, b: { x: x + 1, y: y + 1, z } },
  { a: { x, y, z: z + 1 }, b: { x, y: y + 1, z: z + 1 } },
  { a: { x: x + 1, y, z: z + 1 }, b: { x: x + 1, y: y + 1, z: z + 1 } },
  { a: { x, y, z }, b: { x, y, z: z + 1 } },
  { a: { x: x + 1, y, z }, b: { x: x + 1, y, z: z + 1 } },
  { a: { x, y: y + 1, z }, b: { x, y: y + 1, z: z + 1 } },
  { a: { x: x + 1, y: y + 1, z }, b: { x: x + 1, y: y + 1, z: z + 1 } },
]

// Which unit cubes (by minimum corner) does a given edge border? An
// interior edge borders up to 4; fewer along the lattice's outer faces.
export const getAdjacentCubes = ({ a, b }, size) => {
  const maxOrigin = size - 2
  const inRange = v => v >= 0 && v <= maxOrigin
  const cubes = []

  if (a.x === b.x && a.y === b.y) {
    // z-direction edge -- shares the cubes around the (x,y) column.
    for (const dx of [-1, 0])
      for (const dy of [-1, 0]) {
        const x = a.x + dx
        const y = a.y + dy
        if (inRange(x) && inRange(y))
          cubes.push({ x, y, z: Math.min(a.z, b.z) })
      }
  } else if (a.x === b.x && a.z === b.z) {
    // y-direction edge
    for (const dx of [-1, 0])
      for (const dz of [-1, 0]) {
        const x = a.x + dx
        const z = a.z + dz
        if (inRange(x) && inRange(z))
          cubes.push({ x, y: Math.min(a.y, b.y), z })
      }
  } else {
    // x-direction edge
    for (const dy of [-1, 0])
      for (const dz of [-1, 0]) {
        const y = a.y + dy
        const z = a.z + dz
        if (inRange(y) && inRange(z))
          cubes.push({ x: Math.min(a.x, b.x), y, z })
      }
  }

  return cubes
}

export const isEdgeDrawn = (edges, edge) =>
  Boolean(edges[edgeKey(edge.a, edge.b)])

export const countCubeEdgesDrawn = (edges, cube) =>
  getCubeEdges(cube).filter(e => isEdgeDrawn(edges, e)).length

// Cubes that would reach all 12 edges if this (currently undrawn) edge
// were drawn.
export const cubesCompletedBy = (edges, edge, size) =>
  getAdjacentCubes(edge, size).filter(
    cube => countCubeEdgesDrawn(edges, cube) === 11,
  )

// Would drawing this edge leave some adjacent cube one edge away from
// completion (11 of 12), handing the opponent a free cube next turn?
export const isUnsafe = (edges, edge, size) =>
  getAdjacentCubes(edge, size).some(
    cube => countCubeEdgesDrawn(edges, cube) === 10,
  )
