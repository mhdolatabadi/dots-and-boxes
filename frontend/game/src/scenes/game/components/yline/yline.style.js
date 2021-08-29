import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    position: 'relative',
    height: '90%',
    width: '50%',
    borderRadius: '15px',
    margin: 'auto',
    transition: 'all 0.5s',
    '&:hover': {
      backgroundColor: 'red',
    },
  },
}))
