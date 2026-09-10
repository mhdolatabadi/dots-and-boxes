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

// The 3D lattice's edge/cube count grows with the cube of its size
// (an 8x8x8 board has 1344 edges vs. a 4x4x4's 144), so it can't reuse
// the 2D sizes directly -- the same "بزرگ" pick would be wildly
// heavier in 3D than in 2D. Scaled down to keep each pick roughly as
// playable in 3D as its 2D counterpart.
const SIZE_3D_BY_SIZE = { 4: 3, 6: 4, 8: 5 }

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
        onClick={() => startComputer3DGame(SIZE_3D_BY_SIZE[selectedSize])}
      >
        بازی سه‌بعدی (آزمایشی)
      </div>
    </div>
  )
}
