import { makeStyles } from '@material-ui/core'
import { DOT_SIZE } from '../../grid3dLayout'

export default makeStyles(theme => ({
  cube: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${DOT_SIZE}px`,
    height: `${DOT_SIZE}px`,
    marginTop: `-${DOT_SIZE / 2}px`,
    marginLeft: `-${DOT_SIZE / 2}px`,
    transformStyle: 'preserve-3d',
  },
  face: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    // A radial highlight near one corner reads as a lit sphere.
    background:
      'radial-gradient(circle at 32% 28%, #ffffff 0%, #d7d9de 35%, #9a9ea8 70%, #565a68 100%)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
  },
}))
