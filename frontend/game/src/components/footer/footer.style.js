import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    height: '50px',
    width: '300px',
    '@media (min-width: 420px) and (min-height: 700px)': {
      width: '420px',
    },
    '@media (max-width: 350px) and (max-height: 550px)': {
      width: '100vw',
      borderRadius: '0px',
      height: '30px',
    },
    backgroundColor: 'orange',
    borderRadius: '0 0 30px 30px',
    cursor: 'pointer',
    minWidth: '270px',
    maxWidth: '650px',
    backgroundImage: 'url("header.png")',
    backgroundSize: 'cover',
  },
  button: {
    // marginRight: '30px',
    height: '50px',
    '@media (max-width: 350px) and (max-height: 550px)': {
      height: '30px',
    },
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
    borderRadius: '50px',
    margin: '0 5px',
  },
  channelIcon: {
    height: '100%',
  },
}))
