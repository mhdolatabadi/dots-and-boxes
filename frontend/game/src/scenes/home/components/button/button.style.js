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
    width: '80px',
    height: '80px',
    borderRadius: '100%',
    zIndex: '1',
    '&:hover': {
      backgroundColor: 'orange',
    },
  },
  line: {
    backgroundColor: 'blue',
    width: '90%',
    left: '5%',
    height: '50px',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '25px',
    cursor: 'pointer',
  },
}))

//set back of line gray on hover be color
