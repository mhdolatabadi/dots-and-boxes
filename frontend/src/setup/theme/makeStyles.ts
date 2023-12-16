import { makeStyles } from "@mui/styles";

export const m = (Theme, Props, ClassKey) =>
  makeStyles(Theme, { index: 1, ...Props }, ClassKey)
