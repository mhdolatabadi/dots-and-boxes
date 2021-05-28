import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    padding: '20px',
    display: 'grid',
    minHeight: '270px',
    minWidth: '270px',
    height: '300px',
    width: '300px',
    '@media (min-width: 420px) and (min-height: 700px)': {
      width: '420px',
      height: '420px',
    },
    '@media (max-width: 305px) and (max-height: 520px)': {
      width: '150px',
      height: '150px',
    },
    maxWidth: '650px',
    maxHeight: '650px',
    margin: '0 25px',
    backgroundColor: 'rgb(46, 46, 46)',
  },
}))
