import { makeStyles } from '@mui/styles'

export default makeStyles(theme => ({
  root: {
    zIndex: '1000',
    width: '90%',
    height: '90%',
    borderRadius: '99999999px',
    margin: 'auto',
    boxShadow: '10px purple',
    '&:hover': {
      backgroundColor: 'orange',
    },
  },

  rich: {
    backgroundColor: '#ffa600',
  },

  dark: {
    backgroundColor: '#ffa500',
  },

  lite: {
    backgroundColor: '#ffa600',
  },
}))
