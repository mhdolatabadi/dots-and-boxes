import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    height: '100%',
    width: '100%',
    backgroundColor: 'gray',
    userSelect: 'none',
  },
  title: {
    color: 'white',
    marginBottom: '24px',
  },
  button: {
    padding: '16px 32px',
    borderRadius: '8px',
    backgroundColor: 'darkred',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
    textAlign: 'center',
    minWidth: '220px',
    '&:active': {
      opacity: 0.8,
    },
  },
}))
