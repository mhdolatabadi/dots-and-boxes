const { query } = require('./index')
const format = require('pg-format') //for arrays

exports.getHistoryByGameIdAndPlayerId = (gameId, playerId) =>
	query(
		`
      select x, y from history
      where game_id = $1 and player_id = $2
    `,
		[gameId, playerId],
	).then(({ rows }) => rows)

exports.saveHistory = (x, y, playerId, gameId) =>
	query(
		`
      INSERT INTO HISTORY
      VALUES($1, $2, $3, $4)
    `,
		[x, y, playerId, gameId],
	)
