import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    width: '300px',
    height: '70px',
    padding: '10px',
    display: 'flex',
    direction: 'rtl',
    backgroundImage: 'url("header.png")',
    backgroundSize: 'cover',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '30px',
    fontWeight: 'bold',
  },
  icon: {
    height: '60px',
  },
  subscribers: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
