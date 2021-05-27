import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    height: '50px',
    width: '90vmin',

    backgroundColor: 'orange',
    borderRadius: '0 0 50px 50px',
    cursor: 'pointer',
    minWidth: '270px',
    maxWidth: '450px',
  },
  button: {
    // marginRight: '30px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  channel: {
    height: '70%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'wheat',
    padding: '3px 8px',
    borderRadius: '10px',
    margin: '0 5px',
  },
  channelIcon: {
    height: '100%',
  },
}))
