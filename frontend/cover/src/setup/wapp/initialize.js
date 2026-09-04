import { mockWebliteApi } from '@web-lite/api-types'
// hooks
import { wappDidStart } from './hooks'

// mockWebliteApi only replaces window.W in development (see
// @web-lite/api-types), so a production build served outside the actual
// Weblite platform has no W at all -- fall back to starting directly.
mockWebliteApi({})
const { W } = window
if (W) {
  W.setHooks({})
  W.initializeAsync().then(wappDidStart)
} else {
  wappDidStart()
}
