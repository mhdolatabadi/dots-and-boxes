// Shared pixel layout for every 3D component -- keeps dots, edges and
// cube fills all positioned in the same coordinate space.

export const UNIT = 56 // px between adjacent lattice dots
export const CUBE_FILL_SIZE = UNIT * 0.68

// Edges are built as real 3D rods -- a ring of thin flat "staves"
// around a shared axis, the standard CSS way to fake a round cylinder
// cross-section (see cube3d.js for the same idea applied to a box's 6
// faces). A flat rectangle with a painted gradient can never actually
// look round from every angle; this has real volume, so it does.
export const EDGE_RADIUS = 4
export const EDGE_SEGMENTS = 8
export const EDGE_STAVE_HEIGHT = (2 * Math.PI * EDGE_RADIUS) / EDGE_SEGMENTS

// Centers the whole size x size x size lattice on the scene's origin.
export const toPx = (coord, size) => (coord - (size - 1) / 2) * UNIT
