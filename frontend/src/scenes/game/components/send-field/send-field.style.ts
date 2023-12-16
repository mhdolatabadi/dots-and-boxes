import { makeStyles } from "@mui/styles";

export default makeStyles(theme => ({
  root: {
    display: 'flex', //TODO set it to none value as it is flex
    gridArea: 'message',
    width: '300px',
    '@media (min-width: 420px) and (min-height: 700px)': {
      width: '420px',
      height: '40px',
    },
    '@media (max-width: 350px) and (max-height: 550px)': {
      width: '100vw',
      height: '25px',
    },
    maxWidth: '650px',

    height: '35px',
    backgroundColor: 'wheat',
  },
  input: {
    direction: 'rtl',
    backgroundColor: 'wheat',
    border: '2px solid wheat',
    flexGrow: 4,
    '&:focus': {
      outline: 'none',
    },
  },
  button: {
    // backgroundColor: 'orange',
    border: '2px solid wheat',
    width: '40px',
    cursor: 'pointer',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    // backgroundColor: 'orange',

    transform: 'scaleX(-1)',
    height: '70%',
    width: '70%',
  },
}))
