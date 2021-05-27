import * as React from 'react'
// style
import useStyle from './game.style'
//localization
import t from './game.local'
//components
import Chat from './components/chat'
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import Paper from './components/paper'
import SendField from './components/send-field'
import Information from '../../components/information'

import '../../services/backend/backend.service'
import ScoreBoard from './components/score-board'

export default function GamePresentational(props) {
  const classes = useStyle()

  return (
    <div className={classes.root}>
      <h1 className={classes.headerText}>{t.page}</h1>
      <Chat />
      <Header />
      <Information />
      <Paper />
      <ScoreBoard />
      <SendField />
      <Footer />
    </div>
  )
}
