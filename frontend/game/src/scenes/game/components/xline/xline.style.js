import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    position: 'relative',
    height: '50%',
    width: '90%',
    transition: 'all 0.5s',
    borderRadius: '15px',
    margin: 'auto',
    '&:hover': {
      backgroundColor: 'rgb(65, 65, 65)',
    },
  },
}))
