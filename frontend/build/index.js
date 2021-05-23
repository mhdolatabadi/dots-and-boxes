import { set } from '../src/data.js'
import { render } from '../src/gameRender.js'

const room =
  'lsweaa123zenV34e.d5m361sskh91s1d0n4LnK383kJ;HiHgF8Nlj23esosdm1f45AXQwsl4dsw'

gameanalytics.GameAnalytics.configureBuild('1.0.0')
gameanalytics.GameAnalytics.initialize(
  'e73000a93dcd27441dc06122212bcba0',
  '02cf80df151c71ff251b3e47e80bb29edbe2a87b'
)

const W = window.W
if (W !== undefined) {
  W.setHooks({
    wappWillStart(start) {
      W.messages.sendMessageToCurrentChat('text', 'نقطه بازی کنیم؟')
      W.notifications.sendToAll('نقطه‌ها منتظرتن! وصلشون نمیکنی؟')
      start()
    },
  })
}

export const roomId = () => {
  if (W !== undefined) {
    const roomId = W.wapp.getWisId()
    set('roomId', roomId)
    return roomId
  } else {
    set('roomId', room)
    return room
  }
}
export const getUserFirstName = () => {
  if (W !== undefined) return W.user.getFirstname()
  else return 'شما'
}
export const getUserId = () => {
  if (W !== undefined) {
    W.initializeAsync()
    const id = W.user.getId()
    set('userId', id)
    return id
  } else {
    const id = prompt('get number')
    set('userId', id)
    return id
  }
}
render()
