import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    display: 'flex', //TODO set it to none value as it is flex
    gridArea: 'message',
    width: '90vmin',
    minWidth: '270px',
    maxWidth: '650px',

    height: '35px',
    backgroundColor: 'wheat',
  },
  input: {
    direction: 'rtl',
    backgroundColor: 'wheat',
    border: '2px solid wheat',
    flexGrow: 4,
    '&:focus': {
      outline: 'none',
    },
  },
  button: {
    backgroundColor: 'orange',
    border: '2px solid wheat',
    width: '60px',
    cursor: 'pointer',
    borderRadius: '10px',
  },
  icon: {
    transform: 'scaleX(-1)',
    height: '100%',
    width: '100%',
  },
}))
