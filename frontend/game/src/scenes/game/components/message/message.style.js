import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    padding: '3px 5px',
  },
  sended: {
    backgroundColor: '#e63950',
    color: '#fff',
    padding: '5px 8px',
    borderRadius: '5px 5px 0 5px',
    transition: 'all 0.35s ease-in-out',
    direction: 'rtl',
    marginRight: '8px',
  },
  recieved: {
    backgroundColor: '#4b5262',
    color: '#f5f6fa',
    padding: '5px 8px',
    borderRadius: '5px 5px 5px 0',
    transition: 'all 0.35s ease-in-out',
    direction: 'rtl',
    marginLeft: '8px',
  },
  system: {
    backgroundColor: '#6c5ce7',
    padding: '5px 8px',
    borderRadius: '5px 5px 5px 0',
    transition: 'all 0.35s ease-in-out',
    color: 'white',
    direction: 'rtl',
    marginLeft: '8px',
  },
}))
