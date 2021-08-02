import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    width: '300px',
    height: '150px',
    backgroundColor: 'orange',
  },
  headerText: { color: props => theme.palette.colorRecommender(props.colorId) },
}))
