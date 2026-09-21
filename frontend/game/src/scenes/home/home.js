import * as React from 'react'
import { useSelector } from 'react-redux'
import useStyle from './home.style'
import dict from './home.local'
import useLocal from '../../setup/i18n/useLocal'
import { startComputerGame } from '../../services/computer/computer.service'
import { startComputer3DGame } from '../../services/computer3d/computer3d.service'
import { startOnlineGame } from '../../services/online/online.service'
import { dispatchPaperSize, paperSizeView } from '../../scenes/_slice/game.slice'
import HowToPlay from '../../components/how-to-play'
import Information from '../../components/information'
import LanguageSwitch from '../../components/language-switch'

// The 3D lattice's edge/cube count grows with the cube of its size
// (an 8x8x8 board has 1344 edges vs. a 4x4x4's 144), so it can't reuse
// the 2D sizes directly -- the same "large" pick would be wildly
// heavier in 3D than in 2D. Scaled down to keep each pick roughly as
// playable in 3D as its 2D counterpart.
const SIZE_3D_BY_SIZE = { 4: 3, 6: 4, 8: 5 }

export default function Home() {
  const classes = useStyle()
  const selectedSize = useSelector(paperSizeView)
  const t = useLocal(dict)

  return (
    <div className={classes.root}>
      <LanguageSwitch />

      <h1 className={classes.title}>{t.title}</h1>

      <div className={classes.sizePicker}>
        {t.sizes.map(({ size, label }) => (
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

      <span className={classes.hint}>{t.hint}</span>

      <div
        className={`${classes.button} ${classes.computerButton}`}
        onClick={startComputerGame}
      >
        {t.computer}
      </div>
      <div
        className={`${classes.button} ${classes.onlineButton}`}
        onClick={startOnlineGame}
      >
        {t.online}
      </div>
      <div
        className={`${classes.button} ${classes.button3D}`}
        onClick={() => startComputer3DGame(SIZE_3D_BY_SIZE[selectedSize])}
      >
        {t.game3d}
      </div>

      <HowToPlay />
      <Information />
    </div>
  )
}
