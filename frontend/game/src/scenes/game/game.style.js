import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  headerText: { color: props => theme.palette.colorRecommender(props.colorId) },
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
    minHeight: '520px',
    minWidth: '305px',
    // maxWidth: '550px',
    backgroundColor: 'gray',
    userSelect: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}))
