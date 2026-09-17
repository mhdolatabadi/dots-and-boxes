import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  root: {
    padding: '20px',
    display: 'grid',

    height: 'clamp(300px, 90vmin, 650px)',
    width: 'clamp(300px, 90vmin, 650px)',
    margin: '0 25px',
    borderRadius: '8px',
    backgroundColor: '#282c34',
  },
}))
