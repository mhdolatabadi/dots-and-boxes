import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '8px',
    opacity: 0.7,
    transition: 'opacity 0.15s',
    '&:hover': {
      opacity: 1,
    },
  },
  github: {
    height: '22px',
  },
}))
