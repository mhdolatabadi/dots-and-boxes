import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    transformStyle: 'preserve-3d',
  },
  face: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '20px',
    height: '20px',
    marginTop: '-10px',
    marginLeft: '-10px',
    borderRadius: '50%',
    // A radial highlight near one corner reads as a lit sphere from any
    // camera angle -- a flat shaded disc always faces the viewer, which
    // happens to be exactly correct for a sphere's silhouette.
    background:
      'radial-gradient(circle at 32% 28%, #ffffff 0%, #d7d9de 35%, #9a9ea8 70%, #565a68 100%)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.6)',
  },
}))
