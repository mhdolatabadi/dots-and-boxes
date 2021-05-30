import * as React from 'react'
// style
import useStyle from './snackbar.style'
// localiztion
import t from './snackbar.local'
import { Button, IconButton, Snackbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

export default function CustomSnackbar({ open, handleClose, message }) {
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
