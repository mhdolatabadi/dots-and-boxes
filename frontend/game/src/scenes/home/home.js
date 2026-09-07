import * as React from 'react'
import { useSelector } from 'react-redux'
import useStyle from './home.style'
import { startComputerGame } from '../../services/computer/computer.service'
import { startComputer3DGame } from '../../services/computer3d/computer3d.service'
import { startOnlineGame } from '../../services/online/online.service'
import { dispatchPaperSize, paperSizeView } from '../../scenes/_slice/game.slice'

const BOARD_SIZES = [
  { size: 4, label: 'کوچک' },
  { size: 6, label: 'متوسط' },
  { size: 8, label: 'بزرگ' },
]

export default function Home() {
  const classes = useStyle()
  const selectedSize = useSelector(paperSizeView)

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>نقطه‌بازی</h1>

      <div className={classes.sizePicker}>
        {BOARD_SIZES.map(({ size, label }) => (
          <div
            key={size}
            className={`${classes.sizeOption} ${
              size === selectedSize ? classes.sizeOptionSelected : ''
            }`}
            onClick={() => dispatchPaperSize(size)}
          >
            {label}
          </div>
        ))}
      </div>

      <span className={classes.hint}>
        در بازی آنلاین، اندازه‌ی صفحه رو کسی که اول لینک رو باز می‌کنه تعیین
        می‌کنه
      </span>

      <div
        className={`${classes.button} ${classes.computerButton}`}
        onClick={startComputerGame}
      >
        بازی با کامپیوتر
      </div>
      <div
        className={`${classes.button} ${classes.onlineButton}`}
        onClick={startOnlineGame}
      >
        بازی آنلاین (دونفره)
      </div>
      <div
        className={`${classes.button} ${classes.button3D}`}
        onClick={() => startComputer3DGame()}
      >
        بازی سه‌بعدی (آزمایشی)
      </div>
    </div>
  )
}
