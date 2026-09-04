import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    width: '300px',
    '@media (min-width: 420px) and (min-height: 700px)': {
      width: '420px',
    },
    '@media (max-width: 350px) and (max-height: 550px)': {
      width: '100vw',
      height: '100%',
    },
    maxWidth: '650px',
    backgroundColor: '#2f3542',
  },
  messageList: {
    minHeight: '35px',
    width: '100%',
    height: '50px',
    '@media (min-height: 720px)': {
      height: '80px',
    },
    overflowY: 'auto',
    direction: 'rtl',
    backgroundColor: '#282c34',
    padding: '5px 0',
    '&::-webkit-scrollbar': {
      backgroundColor: '#282c34',
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#282c34',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#4b5262',
      borderRadius: '9px',
    },
    '&::-webkit-scrollbar-button': {
      display: 'none',
    },
  },
  button: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    direction: 'rtl',
    color: '#f5f6fa',
    backgroundColor: '#2f3542',
    padding: '5px 15px',
    height: '20px',
    fontSize: '12px',
  },
  title: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: '300%',
  },
  empty: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#9aa0ac',
    fontSize: '12px',
  },
}))
