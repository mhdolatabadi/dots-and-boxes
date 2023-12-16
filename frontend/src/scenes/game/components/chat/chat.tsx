import * as React from 'react'
import useStyle from './chat.style'
import t from './chat.local'
import Message from '../message'
import { useSelector } from 'react-redux'
import { messagesView, playerIdView } from '../../../_slice/game.slice'

export default function Chat() {
  const classes = useStyle()
  const playerId = useSelector(playerIdView)
  const messages = useSelector(messagesView)

  const [chatExpansion, setChatExpansion] = React.useState('block')

  const messagesRef = React.useRef<HTMLDivElement>(null)

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
        <div className={classes.title}>
          <img className={classes.icon} src="chat.png" alt="chat" />
          <span>{t.chat}</span>
        </div>
        <span>{chatExpansion === 'block' ? t.collapse : t.expand}</span>
      </div>
      <div
        className={classes.messageList}
        style={{
          display: chatExpansion,
        }}
      >
        {messages.length > 0 ? (
          messages.map(({ sender, content }: {sender: string; content: string}) => {
            if (sender === playerId)
              return <Message type="sended" content={content} key={content} />
            else if (sender === 'noghte-bazi')
              return <Message type="system" content={content} key={content} />
            else
              return <Message type="recieved" content={content} key={content} />
          })
        ) : (
          <div className={classes.empty}>{t.empty}</div>
        )}
        <div ref={messagesRef}></div>
      </div>
    </div>
  )
}
