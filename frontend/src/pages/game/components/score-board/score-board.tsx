import useRichStyle from './score-board.rich.style'
import useDarkStyle from './score-board.dark.style'
import useLiteStyle from './score-board.lite.style'

import clsx from 'clsx'
import { useSelector } from 'react-redux'
import {
  getPlayerHasPermission,
  opponentNameView,
  opponentProfileImageView,
  opponentScoreView,
  playerColorView,
  playerNameView,
  playerProfileImageView,
  playerScoreView,
} from '../../../../slices/game.slice'
import { Avatar } from '@mui/material'

interface Props {
  theme: {
    darkMode: boolean
    richMode: boolean
  }
}

export default function ScoreBoard({ theme }: Props) {
  const playerName = useSelector(playerNameView)
  const playerColor = useSelector(playerColorView)
  const playerScore = useSelector(playerScoreView)
  const playerHasPermission = useSelector(getPlayerHasPermission)
  const playerProfileImage = useSelector(playerProfileImageView)

  const opponentName = useSelector(opponentNameView)
  const opponentScore = useSelector(opponentScoreView)
  const opponentProfileImage = useSelector(opponentProfileImageView)

  const amIRed = playerColor === 'red'

  const blueText = !amIRed ? `${playerName}` : `${opponentName}`
  const redText = amIRed ? `${playerName}` : `${opponentName}`

  const redAvatar = amIRed ? playerProfileImage : opponentProfileImage
  const blueAvatar = amIRed ? opponentProfileImage : playerProfileImage

  const isRedActive = amIRed
    ? playerHasPermission
      ? true
      : false
    : playerHasPermission
    ? false
    : true

  const richClasses = useRichStyle()
  const darkClasses = useDarkStyle()
  const liteClasses = useLiteStyle()
  const { darkMode, richMode } = theme
  const classes = richMode ? richClasses : darkMode ? darkClasses : liteClasses

  return (
    <div className={classes.root}>
      <div
        className={clsx(
          classes.score,
          // isRedActive ? classes.blue : classes.activeBlue,
        )}
      >
        {richMode && (
          <Avatar
            src={blueAvatar}
            // className={clsx(classes.avatar, classes.blueAvatar)}
          />
        )}
        <span>{blueText}</span>
      </div>
      <div
        className={clsx(
          // isRedActive ? classes.redActiveScores : classes.blueActiveScores,
          classes.scores,
        )}
      >{`${opponentScore} - ${playerScore}`}</div>
      <div
        className={clsx(
          classes.score,
          // isRedActive ? classes.activeRed : classes.red,
        )}
      >
        <span>{redText}</span>
        {richMode && (
          <Avatar
            src={redAvatar}
            // className={clsx(classes.avatar, classes.redAvatar)}
          />
        )}
      </div>
    </div>
  )
}
