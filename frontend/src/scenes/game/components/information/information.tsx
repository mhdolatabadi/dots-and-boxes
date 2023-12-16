import * as React from 'react'
import useStyle from './information.style'
import t from './information.local'

import { setTheme } from '../../../_slice/game.slice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Drawer, FormControlLabel, Switch } from '@mui/material'
import { Settings } from '@mui/icons-material'

interface Props {
  theme: {
    darkMode: boolean
    richMode: boolean
  }
}

export default function Information({ theme }: Props) {
  const dispatch = useDispatch()
  const classes = useStyle()
  const { darkMode, richMode } = theme
  const [drawerState, setDrawerState] = React.useState(false)
  const [richModeState, setRichModeState] = useState(richMode)
  const [darkModeState, setDarkModeState] = useState(darkMode)

  const toggleDrawer = (open: boolean) => (event: KeyboardEvent) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    )
      return
    setDrawerState(open)
  }

  const toggleRichMode = () => {
    setRichModeState(!richModeState)
    if (!richModeState) dispatch(setTheme({ darkMode, richMode: true }))
    else dispatch(setTheme({ darkMode, richMode: false }))
  }

  const toggleDarkMode = () => {
    setDarkModeState(!darkModeState)
    dispatch(setTheme({ richMode, darkMode: !darkMode }))
  }

  return (
    <div className={classes.root}>
      <Settings
        style={{
          color: !darkMode && !richMode ? 'black' : 'white',
          fontSize: '35px',
        }}
        onClick={() => toggleDrawer(true)}
      />
      <Drawer
        open={drawerState}
        onClose={() => toggleDrawer(false)}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <FormControlLabel
          className={classes.controller}
          control={
            <Switch
              checked={!richModeState}
              onChange={toggleRichMode}
              name="checkedB"
              color="secondary"
            />
          }
          label={t.richMode}
        />
        <FormControlLabel
          className={classes.controller}
          label={t.darkMode}
          control={
            <Switch
              checked={darkModeState}
              onChange={toggleDarkMode}
              name="checkedB"
              color="secondary"
              disabled={richModeState}
            />
          }
        />
      </Drawer>
    </div>
  )
}
