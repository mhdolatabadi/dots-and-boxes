import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    width: '90vmin',
    margin: '0 10px 10px',
    minWidth: '270px',
    maxWidth: '450px',
    backgroundColor: 'darkgray',
    borderRadius: '15px',
  },
  messageList: {
    // borderRadius: '0 0 50px 50px',
    width: '100%',
    maxHeight: '100px',
    overflowY: 'auto',
    direction: 'rtl',
    backgroundColor: 'darkgray',
    padding: '5px 0',
    borderRadius: '0 0 5px 5px',
    '&::-webkit-scrollbar': {
      // backgroundColor: 'darkgray',
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      // borderRadius: '9px',
      backgroundColor: 'gray',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'gray',
      // borderRadius: '9px',
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
    backgroundColor: 'lightgray',
    padding: '5px 15px',
    borderRadius: '5px',
  },
}))
