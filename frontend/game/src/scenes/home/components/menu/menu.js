import * as React from 'react'
// style
import useStyle from './menu.style'
// localiztion
import t from './menu.local'
import Button from '../button/button'

export default function Menu(props) {
  const classes = useStyle()

  return (
    <div className={classes.root}>
      <Button content="بازی تک‌نفره" color="red" />
      <Button content="بازی دونفره" color="blue" />
      <Button content="بازی سه نفره" color="red" />
      <Button content="بازی چهار نفره" color="blue" />
      <Button content="تنظیمات" color="red" />
      <Button content="خروج" color="blue" />
    </div>
  )
}
