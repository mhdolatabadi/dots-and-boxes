import Button from '../../components/button'
import useStyle from './home.style.js'
import Header from '../../components/header'
import Body from '../../components/body/body'

export default function Home({ colorId, changeColor }) {
  const classes = useStyle({ colorId })

  return (
    <div className={classes.root}>
      <Header />
      <Body />
    </div>
  )
}
