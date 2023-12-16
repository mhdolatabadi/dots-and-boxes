import * as React from 'react'
import useStyle from './send-field.style'
import t from './send-field.local'
import { useDispatch, useSelector } from 'react-redux'
import { addNewMessage, playerIdView } from '../../../_slice/game.slice'
import { sendMessage } from '../../../../services/backend/backend.service'

export default function SendField() {
  const classes = useStyle()
  const dispatch = useDispatch()
  const playerId = useSelector(playerIdView)
  const [content, setContent] = React.useState('')
  const send = () => {
    dispatch(addNewMessage({ sender: playerId, content }))
    sendMessage(content)
    setContent('')
  }

  return (
    <div className={classes.root}>
      <div className={classes.button} onClick={send}>
        <img alt="فرستادن" src="send-button.svg" className={classes.icon} />
      </div>
      <input
        className={classes.input}
        placeholder={t.placeholder}
        value={content}
        onChange={event => setContent(event.target.value)}
        onKeyPress={e => e.key === 'Enter' && send()}
      />
    </div>
  )
}
