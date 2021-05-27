import * as React from 'react'
// style
import useStyle from './footer.style'
// localiztion
import t from './footer.local'
// wapp id: "5e7393898850a7419b1ed495"
// wis id: "60af996b9532b6ecccaf55c4"
export default function Footer(props) {
  const classes = useStyle()

  return (
    <div className={classes.root}>
      <div className={classes.channel}>
        <span>کانال نقطه‌بازی</span>
        <img className={classes.channelIcon} src="dotsandboxes.png" />
      </div>
    </div>
  )
}
