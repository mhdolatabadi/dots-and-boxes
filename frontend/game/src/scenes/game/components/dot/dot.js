import * as React from 'react'
import cns from 'clsx'
// style
import useStyle from './dot.style'
// localiztion

function randomColor() {
  let hex = Math.floor(Math.random() * 0xffffff)
  let color = '#' + hex.toString(16)

  return color
}

export default function Dot({ i, j, theme }) {
  const classes = useStyle()
  const { darkMode, richMode } = theme
  const [background, setBackground] = React.useState('')

  return (
    <div
      className={cns(
        classes.root,
        richMode
          ? classes['rich']
          : darkMode
          ? classes['dark']
          : classes['lite'],
      )}
      style={{
        gridColumn: `${i}`,
        gridRow: `${j}`,
        backgroundColor: background,
      }}
      onClick={() => setBackground(randomColor())}
    ></div>
  )
}
