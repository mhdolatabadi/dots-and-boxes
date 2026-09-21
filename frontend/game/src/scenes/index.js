import React from 'react'
import Game from './game'
import Home from './home'
import Loading from './loading'
import { useSelector } from 'react-redux'
import { gameModeView } from './_slice/game.slice'
import { isLoadingView } from './_slice/loading.slice'
import useSyncDocumentLocale from '../setup/i18n/useSyncDocumentLocale'

// three.js + @react-three/fiber/drei are a sizeable chunk of the
// bundle and only the experimental 3D mode needs them -- code-split so
// the 2D game (what most visitors land on and play) isn't paying to
// download a 3D engine it never uses.
const Game3D = React.lazy(() => import('./game3d'))

export default function Root() {
  const mode = useSelector(gameModeView)
  const isLoading = useSelector(isLoadingView)
  useSyncDocumentLocale()

  if (mode === 'menu') return <Home />
  if (mode === 'computer3d')
    return (
      <React.Suspense fallback={<Loading />}>
        <Game3D />
      </React.Suspense>
    )
  return isLoading ? <Loading /> : <Game />
}
