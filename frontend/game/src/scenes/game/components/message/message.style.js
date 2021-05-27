import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    padding: '10px',
  },
  sended: {
    backgroundColor: 'yellowgreen',
    padding: '5px',
    borderRadius: '5px 5px 0 5px',
    transition: 'all 0.35s ease-in-out',
    // display: 'none',
    direction: 'rtl',
  },
  recieved: {
    backgroundColor: 'rgb(227, 255, 65)',
    padding: '5px',
    borderRadius: '5px 5px 5px 0',
    transition: 'all 0.35s ease-in-out',
    // display: 'none',
    direction: 'rtl',
  },
}))
