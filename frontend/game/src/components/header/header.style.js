import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    direction: 'rtl',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    cursor: 'pointer',
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
    borderRadius: '30px 30px 0 0',
    backgroundColor: 'orange',
    backgroundImage: 'url("header.png")',
    backgroundSize: 'cover',
  },
}))
