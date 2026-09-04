import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    direction: 'rtl',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#f5f6fa',
    fontWeight: 600,
    letterSpacing: '0.02em',
    fontSize: '20px',
    height: '50px',
    width: '300px',
    '@media (min-width: 420px) and (min-height: 700px)': {
      width: '420px',
    },
    '@media (max-width: 350px) and (max-height: 550px)': {
      width: '100vw',
      borderRadius: '0px',
      height: '30px',
      fontSize: '15px',
    },
    minWidth: '270px',
    maxWidth: '650px',

    textAlign: 'center',
    borderRadius: '15px 15px 0 0',
    backgroundColor: '#2f3542',
    borderBottom: '3px solid #e63950',
  },
}))
