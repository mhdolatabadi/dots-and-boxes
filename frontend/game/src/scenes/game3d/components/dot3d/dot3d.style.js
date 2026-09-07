import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '12px',
    height: '12px',
    marginTop: '-6px',
    marginLeft: '-6px',
    borderRadius: '3px',
    backgroundColor: '#e8e8ea',
    boxShadow: '0 0 6px rgba(0, 0, 0, 0.7)',
    transformStyle: 'preserve-3d',
  },
}))
