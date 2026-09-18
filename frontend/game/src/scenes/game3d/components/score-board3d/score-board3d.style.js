import { makeStyles } from '@material-ui/core/styles'

// Same accent colors as the 3D board's own pieces (see displayColor.js),
// so the scoreboard reads as part of the same scene instead of a
// mismatched, oversaturated strip bolted on top of it.
export default makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '300px',
    marginBottom: '10px',
    maxWidth: '420px',
    height: '20px',
    borderRadius: '8px',
    overflow: 'hidden',
    '@media (min-width: 420px) and (min-height: 700px)': {
      width: '420px',
      height: '30px',
    },
  },
  blue: {
    backgroundColor: 'rgba(59, 130, 196, 0.28)',
    transition: '0.3s',
  },
  activeBlue: {
    backgroundColor: '#3b82c4',
    boxShadow: '0 0 10px rgba(59, 130, 196, 0.6)',
    transition: '0.3s',
  },
  red: {
    backgroundColor: 'rgba(230, 57, 80, 0.28)',
    transition: '0.3s',
  },
  activeRed: {
    backgroundColor: '#e63950',
    boxShadow: '0 0 10px rgba(230, 57, 80, 0.6)',
    transition: '0.3s',
  },
  score: {
    padding: '3px 0',
    textAlign: 'center',
    color: 'white',
    fontSize: '14px',
    width: '50%',
    '@media (min-width: 420px) and (min-height: 700px)': {
      fontSize: '20px',
    },
  },
}))
