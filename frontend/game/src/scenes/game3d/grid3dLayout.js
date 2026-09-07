// Shared pixel layout for every 3D component -- keeps dots, edges and
// cube fills all positioned in the same coordinate space.

export const UNIT = 56 // px between adjacent lattice dots
export const CUBE_FILL_SIZE = UNIT * 0.68

// Centers the whole size x size x size lattice on the scene's origin.
export const toPx = (coord, size) => (coord - (size - 1) / 2) * UNIT
