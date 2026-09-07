import { makeStyles } from '@material-ui/core'
import { UNIT } from '../../grid3dLayout'

export default makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${UNIT}px`,
    height: '8px',
    marginTop: '-4px',
    marginLeft: `-${UNIT / 2}px`,
    borderRadius: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.035)',
    // A light-to-dark band across the thickness, independent of
    // whatever backgroundColor is set (transparent when undrawn, the
    // team color once drawn), reads as a lit round cross-section --
    // i.e. a cylinder -- instead of a flat bar.
    backgroundImage:
      'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 35%, rgba(0,0,0,0.05) 55%, rgba(0,0,0,0.4) 100%)',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.4)',
    cursor: 'pointer',
    transformStyle: 'preserve-3d',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
}))
