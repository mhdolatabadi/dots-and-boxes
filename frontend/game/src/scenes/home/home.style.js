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
    backgroundColor: '#1f2430',
    userSelect: 'none',
  },
  title: {
    color: '#f5f6fa',
    fontWeight: 600,
    marginBottom: '16px',
  },
  button: {
    padding: '16px 32px',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '18px',
    fontWeight: 600,
    cursor: 'pointer',
    textAlign: 'center',
    minWidth: '220px',
    transition: 'transform 0.15s, opacity 0.15s',
    '&:hover': {
      opacity: 0.9,
    },
    '&:active': {
      transform: 'scale(0.97)',
    },
  },
  computerButton: {
    backgroundColor: '#3b82c4',
  },
  onlineButton: {
    backgroundColor: '#e63950',
  },
}))
