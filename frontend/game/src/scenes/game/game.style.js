import { makeStyles } from '@mui/styles'

export default makeStyles(theme => ({
  root: {
    padding: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    height: '100%',
    width: '100%',
    overflowY: 'auto',
    userSelect: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },

  rich: {
    backgroundColor: '#2b0037',
  },

  lite: {
    backgroundColor: theme.palette.primary.lighter,
  },
  dark: {
    backgroundColor: '#000f22',
  },
}))
