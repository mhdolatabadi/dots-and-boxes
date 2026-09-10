import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '300px',
    marginBottom: '10px',
    maxWidth: '420px',
    height: '20px',
    '@media (min-width: 420px) and (min-height: 700px)': {
      width: '420px',
      height: '30px',
    },
  },
  blue: {
    backgroundColor: 'rgb(0, 0, 80)',
    transition: '0.3s',
  },
  activeBlue: {
    backgroundColor: 'rgb(0, 0, 235)',
    transition: '0.3s',
  },
  red: {
    backgroundColor: 'rgb(100, 0, 0)',
    transition: '0.3s',
  },
  activeRed: {
    backgroundColor: 'red',
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
