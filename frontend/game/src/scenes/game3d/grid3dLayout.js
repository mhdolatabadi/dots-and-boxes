// Shared pixel layout for every 3D component -- keeps dots, edges and
// cube fills all positioned in the same coordinate space.

export const UNIT = 68 // px between adjacent lattice dots
export const CUBE_FILL_SIZE = UNIT * 0.68
// A dot is a small rounded box (see dot3d.js) sized close to the
// edge's own thickness, on purpose -- see EDGE_RADIUS below.
export const DOT_SIZE = 20

// Edges are built as real 3D rods -- a ring of thin flat "staves"
// around a shared axis, the standard CSS way to fake a round cylinder
// cross-section (see cube3d.js for the same idea applied to a box's 6
// faces). A flat rectangle with a painted gradient can never actually
// look round from every angle; this has real volume, so it does.
//
// Radius is close to the dot radius (dot3d.style.js: 8px) on purpose --
// too thin a rod next to a much fatter ball reads as two different
// objects that happen to touch, not one continuous piece. The staves
// overlap each other slightly (1.25x their tiled width) so there's
// never a hairline gap between facets showing the hollow inside.
export const EDGE_RADIUS = 7
export const EDGE_SEGMENTS = 18
export const EDGE_STAVE_HEIGHT =
  ((2 * Math.PI * EDGE_RADIUS) / EDGE_SEGMENTS) * 1.3
// Rods run slightly past each dot's center (not just to it), so they
// visibly plunge into the sphere instead of merely grazing its surface.
export const EDGE_OVERSHOOT = 12

// Centers the whole size x size x size lattice on the scene's origin.
export const toPx = (coord, size) => (coord - (size - 1) / 2) * UNIT
