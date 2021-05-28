import React from 'react'
import Game from './game'
import Loading from './loading'
import Home from './home'
import { useInitializeData } from './_hook/useInitializeData'

export default function Root() {
  // useInitializeData()
  return <Game />
}
