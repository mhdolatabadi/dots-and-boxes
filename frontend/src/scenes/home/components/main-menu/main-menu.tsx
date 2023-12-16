import { Button, Stack } from '@mui/material'
import useStyle from './main-menu.style'

export default function MainMenu() {
  const classes = useStyle()

  return (
    <Stack className={classes.root}>
      <Button>create game</Button>
      <Button>profile</Button>
      <Button>setting</Button>
      <Button>about</Button>
      <Button>exit</Button>
    </Stack>
  )
}
