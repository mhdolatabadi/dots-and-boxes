import Footer from '../../components/footer/footer.js'
import Header from '../../components/header/header.js'
import Menu from './components/menu/menu.js'
import useStyle from './home.style.js'

export default function Home({ colorId, changeColor }) {
  const classes = useStyle({ colorId })

  return (
    <div className={classes.root}>
      <h1>خانه</h1>
      <Header type="home" />
      <Menu />
      <Footer />
    </div>
  )
}
