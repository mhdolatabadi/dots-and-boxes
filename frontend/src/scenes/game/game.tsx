import cns from 'clsx'
import useStyle from './game.style'
import Chat from './components/chat'
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import Paper from './components/paper'
import SendField from './components/send-field'

import '../../services/backend/backend.service'
import ScoreBoard from './components/score-board'
import { useInitializeData } from '../_hook'
import { roomWinnerView, themeView } from '../_slice/game.slice'
import { useSelector } from 'react-redux'
import Information from './components/information'

export default function GamePresentational() {
  const classes = useStyle()
  const winner = useSelector(roomWinnerView)
  const theme = useSelector(themeView)
  const { darkMode, richMode } = theme
  useInitializeData()

  return (
    <div
      className={cns(
        classes.root,
        richMode
          ? classes['rich']
          : darkMode
          ? classes['dark']
          : classes['lite'],
      )}
      style={{ backgroundColor: winner ? `dark${winner.color}` : '' }}
    >
      <Information theme={theme} />
      {/* <Timer /> */}
      {theme.richMode && <Header type="game" />}
      {theme.richMode && <Chat />}
      <Paper theme={theme} />
      <ScoreBoard theme={theme} />
      {theme.richMode && <SendField />}
      {theme.richMode && <Footer />}
    </div>
  )
}
