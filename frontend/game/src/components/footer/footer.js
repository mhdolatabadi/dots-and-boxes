import * as React from 'react'
// style
import useStyle from './footer.style'
// localiztion
import t from './footer.local'
import Dialog from '../dialog'
import Snackbar from '../snackbar'
// wapp id: "5e7393898850a7419b1ed495"
// wis id: "60af996b9532b6ecccaf55c4"
// channel id as chat id :"60aa7323fa713a0bc0f54d43"

export default function Footer(props) {
  const classes = useStyle()

  const { W } = window

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
    W.chats.join('60aa7323fa713a0bc0f54d43')
    handleCloseDialog()
    handleClickOpenSnackbar()
  }

  return (
    <div className={classes.root}>
      <div className={classes.button}>
        <div className={classes.channel} onClick={handleClickOpenDialog}>
          <span>کانال نقطه‌بازی</span>
          <img className={classes.channelIcon} src="dotsandboxes.png" />
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
          onClick={() =>
            W.wappSystem.openInDrawer('5f12f01d170f91242534aa92', {
              wisId: '60afc7f29532b6ecccaf560d',
            })
          }
        >
          <span>نظرات</span>
          <img className={classes.channelIcon} src="comment.png" />
        </div>
      </div>
    </div>
  )
}
