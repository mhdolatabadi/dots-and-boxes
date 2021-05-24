import * as React from 'react'
// view
import /* selectorView */ /* actionCreators */ '../_slice/game.slice'
import GamePresentational from './game'

export default function Game(props) {
  // const state = useSelcetor(selectorView)
  // const dispatch = useDispatch()
  // const onClick = () => dispatch(actionCreators('payload'))

  return <GamePresentational />
}
