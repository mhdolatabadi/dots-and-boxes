import { makeStyles } from "@mui/styles";

export default makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 0,
    width: '300px',
    '@media (min-width: 420px) and (min-height: 700px)': {
      width: '420px',
    },
    '@media (max-width: 350px) and (max-height: 550px)': {
      width: '100vw',
    },
    // margin: '0 10px 10px',
    maxWidth: '650px',
  },
  drawer: {
    // width: '100%',
    flexShrink: 0,
    // background: 'navy',
  },

  drawerPaper: {
    padding: '20px',
    backgroundColor: '#fbbb45',
  },

  controller: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    color: 'black',
    direction: 'ltr',
  },
}))
