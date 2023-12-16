import './mockWebliteApi'
import { wappDidStart } from './hooks'

const { W } = window
W.setHooks({
  wappWillStart(start) {
    W.initializeAsync().then(() => {
      start()
      wappDidStart()
    })
  },
})
