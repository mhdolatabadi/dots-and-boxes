import * as React from 'react'
import cns from 'clsx'
import useStyle from './dot.style'

function randomColor() {
  let hex = Math.floor(Math.random() * 0xffffff)
  let color = '#' + hex.toString(16)

  return color
}

interface Props {
  i: number
  j: number
  theme: {
    richMode: boolean
    darkMode: boolean
  }
}

export default function Dot({ i, j, theme }: Props) {
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
