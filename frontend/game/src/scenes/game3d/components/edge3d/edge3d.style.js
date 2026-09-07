import { makeStyles } from '@material-ui/core'
import { UNIT } from '../../grid3dLayout'

export default makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${UNIT}px`,
    height: '6px',
    marginTop: '-3px',
    marginLeft: `-${UNIT / 2}px`,
    borderRadius: '3px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    cursor: 'pointer',
    transformStyle: 'preserve-3d',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
}))
