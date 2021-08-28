import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '300px',
    marginBottom: '6px',
    maxWidth: '650px',
    height: '20px',
    '@media (min-width: 420px) and (min-height: 700px)': {
      width: '420px',
      height: '30px',
    },
    '@media (max-width: 350px) and (max-height: 550px)': {
      width: '100vw',
    },
  },
  blue: {
    padding: 'auto',
    backgroundColor: 'rgb(0, 0, 80)',
    boxShadow: '0 5px rgb(0, 0, 80)',
    marginBottom: '6px',
  },
  activeBlue: {
    backgroundColor: 'rgb(0, 0, 235) !important',
    boxShadow: '0 5px rgb(0, 0, 180) !important',
  },
  red: {
    padding: 'auto',

    backgroundColor: 'rgb(100, 0, 0)',
    boxShadow: '0 5px rgb(100, 0, 0)',

    marginBottom: '6px',
  },
  activeRed: {
    backgroundColor: 'red !important',
    boxShadow: '0 5px rgb(200, 0, 0) !important',
  },
  score: {
    padding: '3px 0',
    textAlign: 'center',
    textShadow: 'thistle',
    color: 'white',
    fontSize: '14px',
    marginBottom: 0,
    width: '50%',
    '@media (min-width: 420px) and (min-height: 700px)': {
      fontSize: '20px',
    },
  },
}))
