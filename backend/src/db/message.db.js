const { query } = require('./index')
const format = require('pg-format') //for arrays

exports.getMessageContentByGameIdAndPlayerId = (gameId, playerId) =>
	query(
		`
      select content from message
      where game_id = $1 and player_id = $2
    `,
		[gameId, playerId],
	).then(({ rows }) => rows)

exports.saveMessage = (content, playerId, gameId) =>
	query(
		`
      INSERT INTO MESSAGE
      VALUES($1, $2, $3)
    `,
		[content, playerId, gameId],
	)
