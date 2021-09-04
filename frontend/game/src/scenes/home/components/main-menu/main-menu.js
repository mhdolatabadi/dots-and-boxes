import { Button, Stack } from '@material-ui/core'
import * as React from 'react'
// style
import useStyle from './main-menu.style'

export default function MainMenu(props) {
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
