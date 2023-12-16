import { makeStyles } from "@mui/styles";

export default makeStyles(theme => ({
  root: {
    position: 'relative',
    transition: 'all 0.5s',
    borderRadius: '15px',
    margin: 'auto',
    '&:hover': {
      backgroundColor: (props: { playerColor: 'red' | 'blue'}) =>
        props.playerColor === 'red' ? 'rgb(256,100,100)' : 'rgb(100,100,256)',
    },
  },
  xRoot: {
    height: '50%',
    width: '90%',
    '&:hover': {
      transform: 'scaleY(120%)',
    },
  },
  lastMoveDark: {
    outline: '1px solid gold',
  },
  lastMoveLight: {
    outline: '1px solid black',
  },
  xLastMove: {
    outlineWidth: '1px 0',
  },

  yRoot: {
    height: '90%',
    width: '50%',
    '&:hover': {
      transform: 'scaleX(120%)',
    },
  },
  yLastMove: {
    outlineWidth: '0 1px',
  },
}))