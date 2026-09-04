import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    position: 'relative',
    height: '50%',
    width: '90%',
    cursor: 'pointer',
    transition: 'background-color 0.25s',
    borderRadius: '15px',
    margin: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.035)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.16)',
    },
  },
}))
