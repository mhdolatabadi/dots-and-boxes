import { setPlayerId, setPlayerName } from '../../scenes/_slice/game.slice'
import { getCurrentUserId, getUserFirstName } from '../../services/weblite/weblite.api'
import store from '../store/store'

// Player identity (id + display name) is local and cheap to set up
// immediately; picking a game mode (online vs. computer) happens later,
// from the home screen.
store.dispatch(setPlayerId({ id: getCurrentUserId() }))
store.dispatch(setPlayerName({ name: getUserFirstName() }))
