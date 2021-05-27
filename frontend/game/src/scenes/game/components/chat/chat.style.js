import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    width: '90vmin',
    margin: '0 10px 10px',
    minWidth: '270px',
    maxWidth: '450px',
  },
  messageList: {
    borderRadius: '0 0 15px 15px',
    width: '100%',
    maxHeight: '100px',
    overflowY: 'auto',
    direction: 'rtl',
    backgroundColor: 'darkgray',
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
    padding: '5px',
    borderRadius: '5px',
  },
}))
