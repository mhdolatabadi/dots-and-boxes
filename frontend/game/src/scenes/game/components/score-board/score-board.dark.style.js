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
  activeBlue: {
    border: '2px blue solid',
  },
  activeRed: {
    border: '2px red solid',
  },
  score: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '25px',
    borderRadius: '20px',
    boxSizing: 'border-box',
    width: '30%',
    color: 'white',
    '@media (min-width: 420px) and (min-height: 700px)': {
      fontSize: '150%',
    },
  },
  scores: {
    padding: '25px',
    color: 'white',
    width: '40%',
    fontSize: '150%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
