import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    zIndex: '1000',
    width: '90%',
    height: '90%',
    borderRadius: '99999999px',
    backgroundColor: 'yellow',
    margin: 'auto',
    boxShadow: '10px purple',
    '&:hover': {
      backgroundColor: 'orange',
    },
  },
}))
