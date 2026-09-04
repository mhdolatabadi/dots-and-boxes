import * as React from 'react'
// style
import useStyle from './game.style'
//localization
//components
import Chat from './components/chat'
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import Paper from './components/paper'
import SendField from './components/send-field'

import '../../services/backend/backend.service'
import ScoreBoard from './components/score-board'
import { useInitializeData } from '../_hook'
import { gameModeView, roomWinnerView } from '../_slice/game.slice'
import { useSelector } from 'react-redux'

export default function GamePresentational(props) {
  const classes = useStyle()
  const winner = useSelector(roomWinnerView)
  const mode = useSelector(gameModeView)
  const isOnline = mode === 'online'
  useInitializeData()

  return (
    <div
      className={classes.root}
      style={{ backgroundColor: winner ? `dark${winner.color}` : 'gray' }}
    >
      <Header type="game" />
      {isOnline && <Chat />}
      {/* <Information /> */}
      <Paper />
      <ScoreBoard />
      {isOnline && <SendField />}
      <Footer />
    </div>
  )
}
