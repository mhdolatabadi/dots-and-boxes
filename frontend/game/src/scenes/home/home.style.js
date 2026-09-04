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
  sizePicker: {
    display: 'flex',
    gap: '8px',
  },
  sizeOption: {
    padding: '8px 18px',
    borderRadius: '8px',
    color: '#c8cad0',
    backgroundColor: '#282c34',
    border: '2px solid transparent',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  sizeOptionSelected: {
    color: '#fff',
    borderColor: '#3b82c4',
  },
  hint: {
    color: '#767c8a',
    fontSize: '12px',
    maxWidth: '260px',
    textAlign: 'center',
    marginBottom: '8px',
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
