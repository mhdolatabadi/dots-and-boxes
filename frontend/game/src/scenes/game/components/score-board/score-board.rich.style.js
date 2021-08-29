import { makeStyles } from '@material-ui/core'
import { props } from 'ramda'

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '300px',
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
  },
  activeBlue: {
    backgroundColor: 'rgb(0, 0, 235) !important',
  },
  red: {
    padding: 'auto',

    backgroundColor: 'rgb(100, 0, 0)',
  },
  activeRed: {
    backgroundColor: 'red !important',
  },
  score: {
    padding: '3px 0',
    textAlign: 'center',
    textShadow: 'thistle',
    color: 'white',
    fontSize: '14px',
    marginBottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    '@media (min-width: 420px) and (min-height: 700px)': {
      fontSize: '20px',
    },
    transition: '2s',
    transitionProperty: 'background-color',
  },

  avatar: {
    border: '2px solid',
    '@media (max-width: 350px) and (max-height: 550px)': {
      height: '20px',
      width: '20px',
    },
    margin: '0 10px',
  },

  redAvatar: {
    borderColor: 'red',
  },

  blueAvatar: {
    borderColor: 'blue',
  },

  scores: {
    color: 'white',
    width: '30%',
    fontSize: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: '2s',
    transitionProperty: 'background-color',
  },

  redActiveScores: {
    background: 'linear-gradient(to left, red, rgb(0, 0, 80))',
  },

  blueActiveScores: {
    background: 'linear-gradient(to left, rgb(100, 0, 0), rgb(0,0,235))',
  },
}))
