import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { colorIdView, setColorId } from '../_slice/home.slice'

export const useColor = () => {
  const dispatch = useDispatch()
  const colorId = useSelector(colorIdView)

  const changeColor = useCallback(() => {
    dispatch(setColorId(colorId + 1))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[colorId])

  return [colorId, changeColor]
}