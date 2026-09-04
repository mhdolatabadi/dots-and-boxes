import * as React from 'react'
import useStyle from './home.style'
import { startComputerGame } from '../../services/computer/computer.service'
import { startOnlineGame } from '../../services/online/online.service'

export default function Home() {
  const classes = useStyle()

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>نقطه‌بازی</h1>
      <div className={classes.button} onClick={startComputerGame}>
        بازی با کامپیوتر
      </div>
      <div className={classes.button} onClick={startOnlineGame}>
        بازی آنلاین (دونفره)
      </div>
    </div>
  )
}
