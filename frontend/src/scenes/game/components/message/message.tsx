import useStyle from './message.style'

interface Props {
  type: string
  content: string
}

export default function Message({ type, content }: Props) {
  const classes = useStyle()
  const direction = type === 'sended' ? 'rtl' : 'ltr'
  return (
    <div className={classes.root} style={{ direction }}>
      <div className={classes[type]}>
        <span>{content}</span>
      </div>
    </div>
  )
}
