import { makeStyles } from '@mui/styles'

export default makeStyles(theme => ({
  root: {
    padding: '20px',
    height: '500px',
    width: '300px',
    '@media (min-width: 420px) and (min-height: 700px)': {
      width: '420px',
      height: '620px',
    },
    '@media (max-width: 350px) and (max-height: 550px)': {
      width: '100vw',
      height: '100vw',
    },
    margin: '0 25px',
  },
}))
