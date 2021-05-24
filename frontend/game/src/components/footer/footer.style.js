import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    gridArea: 'buttons',
    height: '50px',
    width: '90vmin',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    borderRadius: '0 0 50px 50px',
    cursor: 'pointer',
  },
}))
