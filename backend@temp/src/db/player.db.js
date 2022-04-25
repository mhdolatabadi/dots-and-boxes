const { query } = require('./index')
const format = require('pg-format') //for arrays

exports.savePlayer = (userId, firstName, lastName) =>
	query(
		`
      insert into player
      values($1, $2, $3)
      on conflict do nothing
    `,
		[userId, firstName, lastName],
	)
