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
    minWidth: '270px',
    maxWidth: '450px',
  },
  channel: {
    height: '70%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: '3px 8px',
    borderRadius: '10px',
  },
  channelIcon: {
    height: '100%',
  },
}))
