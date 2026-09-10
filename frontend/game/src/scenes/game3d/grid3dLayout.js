// Shared world-space layout for the 3D scene -- these are Three.js
// world units, not CSS pixels, so the scale is arbitrary; camera
// distance/fov are tuned to match.

export const UNIT = 1.4 // distance between adjacent lattice dots
export const DOT_RADIUS = 0.22
export const EDGE_RADIUS = 0.09
// A real cylinder mesh already looks round from every angle -- the
// only reason to run it past the dot's exact center is so it visibly
// plunges into the sphere instead of just touching its surface.
export const EDGE_LENGTH = UNIT + 0.1
export const CUBE_FILL_SIZE = UNIT * 0.68

// Centers the whole size x size x size lattice on the scene's origin.
export const toWorld = (coord, size) => (coord - (size - 1) / 2) * UNIT
