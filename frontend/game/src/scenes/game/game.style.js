import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  headerText: { color: props => theme.palette.colorRecommender(props.colorId) },
  root: {
    padding: 'auto',
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
    transition: 'background-color 0.6s ease',
    userSelect: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}))
