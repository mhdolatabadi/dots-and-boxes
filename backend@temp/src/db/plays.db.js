const { query } = require('./index')
const format = require('pg-format') //for arrays

exports.getPlaysByGameId = gameId =>
	query(
		`
      select * from plays
      where game_id = $1
    `,
		[gameId],
	).then(({ rows }) => rows)

exports.savePlays = (score, isWinner, color, role, gameId, playerId) =>
	query(
		`
    insert into plays
    values($1, $2, $3, $4, $5, $6)  
    on conflict do nothing
  `,
		[score, isWinner, color, role, gameId, playerId],
	)
