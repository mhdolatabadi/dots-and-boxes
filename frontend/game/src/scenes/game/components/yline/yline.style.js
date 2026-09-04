import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    position: 'relative',
    height: '90%',
    width: '50%',
    cursor: 'pointer',
    borderRadius: '15px',
    margin: 'auto',
    transition: 'background-color 0.25s',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.22)',
    },
  },
}))
