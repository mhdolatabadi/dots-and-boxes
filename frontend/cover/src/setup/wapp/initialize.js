import { mockWebliteApi } from '@web-lite/api-types'
// hooks
import { wappDidStart } from './hooks'

mockWebliteApi({})
const { W } = window
W.setHooks({})
W.initializeAsync().then(wappDidStart)
