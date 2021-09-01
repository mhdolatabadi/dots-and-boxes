import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    width: '300px',
    maxWidth: '650px',
    '@media (min-width: 420px) and (min-height: 700px)': {
      width: '420px',
    },
    '@media (max-width: 350px) and (max-height: 550px)': {
      width: '100vw',
    },
    marginBottom: '20px',
  },
}))
