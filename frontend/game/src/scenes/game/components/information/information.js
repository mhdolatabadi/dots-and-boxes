import * as React from 'react'
// style
import useStyle from './information.style'
// localiztion
import t from './information.local'

import SettingsIcon from '@material-ui/icons/Settings'
import { Drawer, FormControlLabel, Switch } from '@material-ui/core'
import { setTheme, themeView } from '../../../_slice/game.slice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

export default function Information({ theme }) {
  const dispatch = useDispatch()
  const classes = useStyle()
  const { darkMode, richMode } = theme
  const [drawerState, setDrawerState] = React.useState(false)
  const [richModeState, setRichModeState] = useState(richMode)
  const [darkModeState, setDarkModeState] = useState(darkMode)

  const toggleDrawer = open => event => {
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
      <SettingsIcon
        style={{ color: 'white', fontSize: '35px' }}
        onClick={toggleDrawer(true)}
      />
      <Drawer
        open={drawerState}
        onClose={toggleDrawer(false)}
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
