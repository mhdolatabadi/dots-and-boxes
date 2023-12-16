import useStyle from './snackbar.style'
import { Snackbar } from '@mui/material'

interface Props {
  open: boolean
  handleClose: () => unknown
  message: string
  type: string
}

export default function CustomSnackbar({ open, handleClose, message, type }: Props) {
  const classes = useStyle()

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <div className={classes.root}>{message}</div>
    </Snackbar>
  )
}
