import { darken, makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  button: {
    height: '100%',
    lineHeight: 1.5,
    letterSpacing: -0.08,
    fontSize: theme.spacing(1.5),
    color: theme.palette.ui.white,
    backgroundColor: props => theme.palette.ui[props.backgroundColor],
    borderRadius: theme.spacing(1.5),
    '&:hover': {
      backgroundColor: props =>
        darken(theme.palette.ui[props.backgroundColor], 0.4),
    },
  },
}))
