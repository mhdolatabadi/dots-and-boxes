import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    margin: 'auto',
    padding: 'auto',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url("header.png")',
    flexDirection: 'column',
  },
  icon: {
    width: '200px',
    height: '200px',
  },
  message: {
    direction: 'rtl',
    fontSize: '30px',
  },
}))
