import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    padding: '40px',
    display: 'grid',
    minHeight: '270px',
    minWidth: '270px',
    height: '300px',
    width: '300px',
    maxWidth: '450px',
    maxHeight: '450px',
    margin: '0 25px',
    backgroundColor: 'rgb(46, 46, 46)',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}))
