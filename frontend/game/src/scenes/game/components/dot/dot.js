import * as React from 'react'
import cns from 'clsx'
// style
import useStyle from './dot.style'
// localiztion

export default function Dot({ i, j, theme }) {
  const classes = useStyle()
  const { darkMode, richMode } = theme

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
      style={{ gridColumn: `${i}`, gridRow: `${j}` }}
    ></div>
  )
}
