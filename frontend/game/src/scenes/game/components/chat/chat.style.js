import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    width: '300px',
    '@media (min-width: 420px) and (min-height: 700px)': {
      width: '420px',
    },
    '@media (max-width: 305px) and (max-height: 520px)': {
      width: '150px',
    },
    // margin: '0 10px 10px',
    minWidth: '270px',
    maxWidth: '650px',
    backgroundColor: 'wheat',
  },
  messageList: {
    // borderRadius: '0 0 50px 50px',
    minHeight: '35px',
    width: '100%',
    height: '35px',
    '@media (min-height: 720px)': {
      height: '80px',
    },

    // maxHeight: '100px',
    overflowY: 'auto',
    direction: 'rtl',
    backgroundColor: 'wheat',
    padding: '5px 0',
    '&::-webkit-scrollbar': {
      backgroundColor: 'wheat',
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      // borderRadius: '9px',
      backgroundColor: 'wheat',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'orange',
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
    backgroundColor: 'orange',
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
  },
}))
