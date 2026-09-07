import { makeStyles } from '@material-ui/core'
import { EDGE_RADIUS, EDGE_STAVE_HEIGHT, UNIT } from '../../grid3dLayout'

export default makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${UNIT}px`,
    height: `${EDGE_RADIUS * 2}px`,
    marginTop: `-${EDGE_RADIUS}px`,
    marginLeft: `-${UNIT / 2}px`,
    cursor: 'pointer',
    transformStyle: 'preserve-3d',
  },
  stave: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${UNIT}px`,
    height: `${EDGE_STAVE_HEIGHT}px`,
    marginTop: `-${EDGE_STAVE_HEIGHT / 2}px`,
    marginLeft: `-${UNIT / 2}px`,
    borderRadius: '2px',
  },
}))
