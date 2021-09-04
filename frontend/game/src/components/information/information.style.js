import { makeStyles } from '@mui/styles'

export default makeStyles(theme => ({
  root: {
    gridArea: 'info-container',
    height: '30px',
    width: '300px',
    minWidth: '270px',
    maxWidth: '450px',

    display: 'flex', //TODO set to display none as it is flex
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'wheat',

    padding: '3px',
  },
  github: {
    height: '28px',
    margin: '0 5px',
  },
}))
