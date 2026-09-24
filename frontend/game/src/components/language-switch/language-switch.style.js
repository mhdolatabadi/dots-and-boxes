import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    gap: '6px',
  },
  option: {
    padding: '4px 12px',
    borderRadius: '999px',
    border: '1px solid #383e4a',
    backgroundColor: 'transparent',
    color: '#767c8a',
    fontSize: '12px',
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  optionSelected: {
    color: '#f5f6fa',
    borderColor: '#3b82c4',
    backgroundColor: 'rgba(59, 130, 196, 0.15)',
  },
}))
