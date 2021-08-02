import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    direction: 'rtl',
    padding: '20px',
  },
  button: {
    backgroundColor: 'wheat',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
    borderRadius: '10px',
    fontWeight: 'bold',
  },
}))
