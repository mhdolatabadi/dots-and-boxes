import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  root: {
    marginTop: '8px',
    maxWidth: '320px',
    width: '100%',
    color: '#c8cad0',
  },
  summary: {
    color: '#767c8a',
    fontSize: '13px',
    textAlign: 'center',
    cursor: 'pointer',
    listStyle: 'none',
    '&::-webkit-details-marker': {
      display: 'none',
    },
  },
  content: {
    marginTop: '12px',
    padding: '16px',
    borderRadius: '10px',
    backgroundColor: '#282c34',
  },
  question: {
    color: '#f5f6fa',
    fontSize: '14px',
    margin: '0 0 4px',
  },
  answer: {
    color: '#c8cad0',
    fontSize: '13px',
    lineHeight: 1.8,
    margin: '0 0 16px',
    '&:last-child': {
      marginBottom: 0,
    },
  },
}))
