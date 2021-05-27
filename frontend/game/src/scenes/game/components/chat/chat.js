import * as React from 'react'
// style
import useStyle from './chat.style'
// localiztion
import t from './chat.local'
//components
import Message from '../message'
import { useSelector } from 'react-redux'
import { messagesView, playerIdView } from '../../../_slice/game.slice'

export default function Chat(props) {
  const classes = useStyle()
  const playerId = useSelector(playerIdView)
  const messages = useSelector(messagesView)

  const [chatExpansion, setChatExpansion] = React.useState('block')

  const messagesRef = React.useRef(null)

  React.useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      })
    }
  })

  return (
    <div className={classes.root}>
      <div
        className={classes.button}
        onClick={() =>
          setChatExpansion(chatExpansion === 'block' ? 'none' : 'block')
        }
      >
        <span>{t.chat}</span>
        <span>{chatExpansion === 'block' ? t.collapse : t.expand}</span>
      </div>
      <div
        className={classes.messageList}
        style={{
          display: chatExpansion,
        }}
      >
        {messages.map(({ sender, content }) => {
          if (sender === playerId)
            return <Message type="sended" content={content} />
          else return <Message type="recieved" content={content} />
        })}
        <div ref={messagesRef}></div>
      </div>
    </div>
  )
}
