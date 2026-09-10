import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    margin: 'auto',
    padding: 'auto',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f2430',
    flexDirection: 'column',
    gap: '16px',
  },
  icon: {
    width: '200px',
    height: '200px',
  },
  message: {
    direction: 'rtl',
    fontSize: '24px',
    color: '#f5f6fa',
  },
}))
