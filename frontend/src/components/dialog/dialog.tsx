import * as React from 'react'
// style
import useStyle from './dialog.style'
// localiztion
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

interface Props {
  open: boolean
  handleClose: () => unknown
  onAgree: () => unknown
  title: string
  content: string
  agree: string
  deny: string
}

export default function CustomDialog({
  open,
  handleClose,
  onAgree,
  title,
  content,
  agree,
  deny,
}: Props) {
  const classes = useStyle()
  return (
    <Dialog
      open={open}
      // TransitionComponent={Transition}
      keepMounted
      // onClose={() => handleClose()}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      className={classes.dialog}
    >
      <DialogTitle className={classes.dialogTitle}>{title}</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <DialogContentText className={classes.dialogContentText}>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.dialogBody}>
        <Button className={classes.dialogButton} onClick={() => onAgree()}>
          {agree}
        </Button>
        <Button className={classes.dialogButton} onClick={() => handleClose()}>
          {deny}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
