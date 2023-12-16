import { Provider } from 'react-redux'
import store from './store'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function ReduxProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>
}
