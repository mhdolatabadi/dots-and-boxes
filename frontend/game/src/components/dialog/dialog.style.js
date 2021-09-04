import { makeStyles } from '@mui/styles'

export default makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
  dialog: {
    direction: 'rtl',
  },
  dialogTitle: {
    backgroundImage: 'url("header.png")',
    backgroundSize: 'cover',
  },
  dialogBody: {
    backgroundColor: 'orange',
  },
  dialogContent: {
    backgroundColor: 'wheat',
  },
  dialogContentText: {
    color: 'black',
  },
  dialogButton: {
    backgroundColor: 'wheat',
    borderRadius: '50px',
    margin: '0 5px',
    padding: '5px',
  },
}))
