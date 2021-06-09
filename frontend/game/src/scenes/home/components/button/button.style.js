import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    width: '90%',
    left: '5%',
    marginBottom: '15px',
  },
  point: {
    backgroundColor: 'yellow',
    width: '70px',
    height: '70px',
    borderRadius: '100%',
    zIndex: '1',
    '&:hover': {
      backgroundColor: 'orange',
    },
  },
  line: {
    width: '90%',
    left: '5%',
    height: '50px',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
    direction: 'rtl',

    '&:hover': {
      backgroundColor: 'rgb(65, 65, 65)',
    },
  },

  blue: {
    '&:hover': {
      backgroundColor: 'blue',
    },
  },
  red: {
    '&:hover': {
      backgroundColor: 'red',
    },
  },
}))

//set back of line gray on hover be color
