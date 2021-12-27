const { query } = require('./index')
const format = require('pg-format') //for arrays

exports.getGames = () =>
	query(`
  select * from game
`).then(({ rows }) => rows)

exports.saveGame = (gameId, turn, size) =>
	query(
		`
      insert into game
      values($1, $2, $3)
      on conflict do nothing
    `,
		[gameId, turn, size],
	)
