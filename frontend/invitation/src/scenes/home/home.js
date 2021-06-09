import Button from '../../components/button'
import useStyle from './home.style.js'

export default function Home({ colorId, changeColor }) {
  const classes = useStyle({ colorId })

  return (
    <div>
      <h1 className={classes.headerText}>Home</h1>
      <Button backgroundColor="green" onClick={changeColor}>
        Color changer
      </Button>
    </div>
  )
}
