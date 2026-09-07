import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '48px',
    margin: 0,
    height: '100%',
    width: '100%',
    overflowY: 'auto',
    backgroundColor: '#1f2430',
    userSelect: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  hint: {
    color: '#767c8a',
    fontSize: '12px',
    maxWidth: '280px',
    textAlign: 'center',
    margin: '10px 0',
  },
  backButton: {
    marginTop: '18px',
    padding: '10px 24px',
    borderRadius: '8px',
    color: '#c8cad0',
    backgroundColor: '#282c34',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'opacity 0.15s',
    '&:hover': {
      opacity: 0.85,
    },
  },
  winnerBanner: {
    marginTop: '14px',
    padding: '10px 20px',
    borderRadius: '8px',
    backgroundColor: '#2f3542',
    color: '#f5f6fa',
    fontWeight: 600,
    fontSize: '16px',
    textAlign: 'center',
  },
}))
