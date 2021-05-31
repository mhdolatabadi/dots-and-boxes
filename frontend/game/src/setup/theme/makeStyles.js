import { makeStyles as muiMakeStyle } from '@material-ui/core'

export const makeStyles = (Theme, Props, ClassKey) =>
  muiMakeStyle(Theme, { index: 1, ...Props }, ClassKey)

/*
 * A patch fixing MUI-React 17 incompatibility
 * style won't respect specificity in production build
 * stack
 * React 17.0.2
 * MaterialUI 4.11.3
 *
 * Use this makeStyles in you stylesheet or pass index:1 to material makeStyles as a HACK
 */
