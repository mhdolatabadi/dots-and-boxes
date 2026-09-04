// Pure, framework-free move selection for the vs-computer opponent.
//
// Coordinates use the same scheme as the board itself (see paper.js):
// a line (i,j) is an Xline when i is odd and j is even, a Yline when i
// is even and j is odd; a box lives at even (i,j) and is bordered by
// the four lines immediately around it.

const isLine = (i, j) => (i % 2 === 0) !== (j % 2 === 0)

const getAllLines = paperSize => {
  const max = 2 * paperSize - 1
  const lines = []
  for (let i = 1; i <= max; i++) {
    for (let j = 1; j <= max; j++) {
      if (isLine(i, j)) lines.push({ i, j })
    }
  }
  return lines
}

const isDrawn = (history, i, j) => Boolean(history[i] && history[i][j])

const getUndrawnLines = (history, paperSize) =>
  getAllLines(paperSize).filter(({ i, j }) => !isDrawn(history, i, j))

// Boxes bordering a given line -- up to two, fewer at the board edge.
const getAdjacentBoxes = (i, j, paperSize) => {
  const max = 2 * paperSize - 1
  const boxes = []
  if (i % 2 === 1) {
    // Xline: boxes above/below
    if (i - 1 >= 2) boxes.push({ i: i - 1, j })
    if (i + 1 <= max - 1) boxes.push({ i: i + 1, j })
  } else {
    // Yline: boxes left/right
    if (j - 1 >= 2) boxes.push({ i, j: j - 1 })
    if (j + 1 <= max - 1) boxes.push({ i, j: j + 1 })
  }
  return boxes
}

const countBoxSides = (history, boxI, boxJ) =>
  [
    [boxI - 1, boxJ],
    [boxI + 1, boxJ],
    [boxI, boxJ - 1],
    [boxI, boxJ + 1],
  ].filter(([i, j]) => isDrawn(history, i, j)).length

// How many boxes would immediately complete (reach 4 sides) if this
// line were drawn.
const boxesCompletedBy = (history, i, j, paperSize) =>
  getAdjacentBoxes(i, j, paperSize).filter(
    box => countBoxSides(history, box.i, box.j) === 3,
  ).length

// Would drawing this line leave some adjacent box at exactly 3 sides,
// handing the opponent a free box next turn?
const isUnsafe = (history, i, j, paperSize) =>
  getAdjacentBoxes(i, j, paperSize).some(
    box => countBoxSides(history, box.i, box.j) === 2,
  )

const randomOf = list => list[Math.floor(Math.random() * list.length)]

// Picks the computer's next line: take a free box if one is available
// (preferring whichever move completes the most at once), otherwise
// play a move that doesn't hand the opponent a box, and only concede
// one when every remaining move would. Returns { i, j, completes } or
// null once the board is full.
export const chooseMove = (history, paperSize) => {
  const candidates = getUndrawnLines(history, paperSize)
  if (candidates.length === 0) return null

  const scored = candidates.map(line => ({
    ...line,
    completes: boxesCompletedBy(history, line.i, line.j, paperSize),
  }))

  const completing = scored.filter(line => line.completes > 0)
  if (completing.length > 0) {
    const mostCompleted = Math.max(...completing.map(line => line.completes))
    return randomOf(completing.filter(line => line.completes === mostCompleted))
  }

  const safe = candidates.filter(
    line => !isUnsafe(history, line.i, line.j, paperSize),
  )
  if (safe.length > 0) return { ...randomOf(safe), completes: 0 }

  return { ...randomOf(candidates), completes: 0 }
}
