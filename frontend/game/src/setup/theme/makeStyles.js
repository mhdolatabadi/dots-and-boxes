import { makeStyles as muiMakeStyle } from '@material-ui/core'

export const makeStyles = (Theme, Props, ClassKey) =>
  muiMakeStyle(Theme, { index: 1, ...Props }, ClassKey)
