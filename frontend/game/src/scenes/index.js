import React from 'react'
import Game from './game'
import Loading from './loading'
import Home from './home'
import { useInitializeData } from './_hook/useInitializeData'
import { useSelector } from 'react-redux'
import { isLoadingView } from './_slice/loading.slice'

export default function Root() {
  // useInitializeData()
  const isLoading = useSelector(isLoadingView)
  return isLoading ? <Loading /> : <Game />
}
