import * as React from 'react'
import useStyle from './footer.style'
import t from './footer.local'
import Dialog from '../dialog'
import Snackbar from '../snackbar'

export default function Footer() {
  const classes = useStyle()

  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />
  // })
  const [openDialog, setOpenDialog] = React.useState(false)
  const [openSnackbar, setOpenSnackbar] = React.useState(false)

  const handleClickOpenDialog = () => setOpenDialog(true)
  const handleClickOpenSnackbar = () => setOpenSnackbar(true)

  const handleCloseDialog = () => setOpenDialog(false)
  const handleCloseSnackbar = () => setOpenSnackbar(false)

  const onAgree = () => {
    handleCloseDialog()
    handleClickOpenSnackbar()
  }

  return (
    <div className={classes.root}>
      <div className={classes.button}>
        <div className={classes.channel} onClick={handleClickOpenDialog}>
          <span>کانال نقطه‌بازی</span>
          <img
            alt="dotsandboxess"
            className={classes.channelIcon}
            src="dotsandboxes.png"
          />
        </div>
        <Dialog
          handleClose={handleCloseDialog}
          open={openDialog}
          onAgree={onAgree}
          title={t.channelDialog.title}
          content={t.channelDialog.content}
          agree={t.channelDialog.agree}
          deny={t.channelDialog.deny}
        />
        <Snackbar
          open={openSnackbar}
          message={'با موفقیت انجام شد'}
          type={'successful'}
          handleClose={handleCloseSnackbar}
        />

        <div
          className={classes.channel}
          onClick={console.log}
        >
          <span>نظرات</span>
          <img
            alt="comment"
            className={classes.channelIcon}
            src="comment.png"
          />
        </div>
      </div>
    </div>
  )
}
