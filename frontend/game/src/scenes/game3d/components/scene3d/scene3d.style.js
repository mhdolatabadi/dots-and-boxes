import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  viewport: {
    position: 'relative',
    width: '100%',
    maxWidth: '520px',
    height: '460px',
    overflow: 'hidden',
    perspective: '1000px',
    touchAction: 'none',
    cursor: 'grab',
    userSelect: 'none',
    '&:active': {
      cursor: 'grabbing',
    },
  },
  world: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 0,
    height: 0,
    transformStyle: 'preserve-3d',
  },
}))
