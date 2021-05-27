import * as React from 'react'
// style
import useStyle from './footer.style'
// localiztion
import t from './footer.local'
// wapp id: "5e7393898850a7419b1ed495"
// wis id: "60af996b9532b6ecccaf55c4"
// channel id as chat id :"60aa7323fa713a0bc0f54d43"
export default function Footer(props) {
  const classes = useStyle()

  const { W } = window

  return (
    <div className={classes.root}>
      <div className={classes.button}>
        <div
          className={classes.channel}
          onClick={() =>
            W.wappSystem.openInPopup('5e7393898850a7419b1ed495', {
              input: { chatId: '60aa7323fa713a0bc0f54d43' },
              uiOptions: {
                height: 310,
              },
            })
          }
        >
          <span>کانال نقطه‌بازی</span>
          <img className={classes.channelIcon} src="dotsandboxes.png" />
        </div>
        <div className={classes.channel}>
          <span>نظرات</span>
          <img className={classes.channelIcon} src="comment.png" />
        </div>
      </div>
    </div>
  )
}
