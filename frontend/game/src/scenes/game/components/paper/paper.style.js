import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    padding: '20px',
    display: 'grid',

    height: '300px',
    width: '300px',
    '@media (min-width: 420px) and (min-height: 700px)': {
      width: '420px',
      height: '420px',
    },
    '@media (max-width: 350px) and (max-height: 550px)': {
      width: '100vw',
      height: '100vw',
    },
    margin: '0 25px',
  },

  rich: {
    backgroundColor: 'rgb(46, 46, 46)',
  },
}))
