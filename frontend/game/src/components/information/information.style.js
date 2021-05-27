import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    gridArea: 'info-container',
    display: 'flex', //TODO set to display none as it is flex
    height: '40px',
    width: '90vmin',
    minWidth: '270px',
    maxWidth: '450px',

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'wheat',
  },
  github: {
    height: '30px',
    marginTop: '10px',
  },
}))
