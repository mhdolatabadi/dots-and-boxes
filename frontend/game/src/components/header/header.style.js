import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    direction: 'rtl',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    cursor: 'pointer',
    gridArea: 'header',
    fontSize: '30px',
    height: '80px',
    width: '90vmin',
    textAlign: 'center',
    borderRadius: '50px 50px 0 0',
    backgroundColor: 'orange',
  },
}))
