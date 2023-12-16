import Footer from '../../components/footer/footer.js'
import Header from '../../components/header/header.js'
import CreateGameMenu from './components/create-game-menu/create-game-menu.js'
import MainMenu from './components/main-menu/main-menu.js'
import useStyle from './home.style.js'

export default function Home({ colorId, changeColor }) {
  const classes = useStyle({ colorId })

  return (
    <div className={classes.root}>
      <h1>خانه</h1>
      {/* <Header type="home" /> */}
      {/* <MainMenu /> */}
      <CreateGameMenu />

      {/* <Footer /> */}
    </div>
  )
}
