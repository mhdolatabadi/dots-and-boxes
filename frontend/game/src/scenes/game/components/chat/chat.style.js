import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    width: '90vmin',
    // margin: '0 10px 10px',
    minWidth: '270px',
    maxWidth: '650px',
    backgroundColor: 'wheat',
    borderRadius: '15px',
  },
  messageList: {
    // borderRadius: '0 0 50px 50px',
    // minHeight: '50px',
    width: '100%',
    height: '80px',
    // maxHeight: '100px',
    overflowY: 'auto',
    direction: 'rtl',
    backgroundColor: 'wheat',
    padding: '5px 0',
    borderRadius: '0 0 5px 5px',
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
    direction: 'rtl',
    backgroundColor: 'orange',
    padding: '5px 15px',
  },
}))
