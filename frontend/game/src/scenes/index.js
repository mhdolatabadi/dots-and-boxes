import React from 'react'
import Game from './game'
import Game3D from './game3d'
import Home from './home'
import Loading from './loading'
import { useSelector } from 'react-redux'
import { gameModeView } from './_slice/game.slice'
import { isLoadingView } from './_slice/loading.slice'

export default function Root() {
  const mode = useSelector(gameModeView)
  const isLoading = useSelector(isLoadingView)

  if (mode === 'menu') return <Home />
  if (mode === 'computer3d') return <Game3D />
  return isLoading ? <Loading /> : <Game />
}
