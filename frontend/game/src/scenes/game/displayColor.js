// Game logic stores/compares raw color identities ('red' | 'blue') --
// these map them to the app's actual accent colors for rendering, so the
// board doesn't clash with the rest of the dark theme.
const LINE_COLORS = {
  red: '#e63950',
  blue: '#3b82c4',
}

const BOX_COLORS = {
  red: 'rgba(230, 57, 80, 0.78)',
  blue: 'rgba(59, 130, 196, 0.78)',
}

export const lineDisplayColor = color => LINE_COLORS[color] || color

export const boxDisplayColor = color => BOX_COLORS[color] || color
