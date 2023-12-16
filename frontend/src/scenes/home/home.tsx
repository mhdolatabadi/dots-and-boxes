import CreateGameMenu from './components/create-game-menu/create-game-menu.js'
import useStyle from './home.style.js'

interface Props {
  colorId: string
  changeColor: () => unknown
}

export default function Home({ colorId, changeColor }: Props) {
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
