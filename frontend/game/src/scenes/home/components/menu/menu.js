import * as React from 'react'
// style
import useStyle from './menu.style'
// localiztion
import Button from '../button/button'

export default function Menu(props) {
  const classes = useStyle()

  return (
    <div className={classes.root}>
      <Button content="حریف دارم!" color="blue" />
      <Button content="پیداکردن حریف (به‌زودی) " color="red" />
      <Button content="مشاهده نمایه (به‌زودی)" color="blue" />
      {/* <Button content="بازی چهار نفره" color="blue" />
      <Button content="تنظیمات" color="red" />*/}
      <Button content="خروج" color="red" />
    </div>
  )
}
