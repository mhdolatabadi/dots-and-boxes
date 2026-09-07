import { makeStyles } from '@material-ui/core'
import { CUBE_FILL_SIZE } from '../../grid3dLayout'

export default makeStyles(theme => ({
  cube: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${CUBE_FILL_SIZE}px`,
    height: `${CUBE_FILL_SIZE}px`,
    marginTop: `-${CUBE_FILL_SIZE / 2}px`,
    marginLeft: `-${CUBE_FILL_SIZE / 2}px`,
    transformStyle: 'preserve-3d',
  },
  face: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.6,
    border: '1px solid rgba(255, 255, 255, 0.18)',
  },
}))
