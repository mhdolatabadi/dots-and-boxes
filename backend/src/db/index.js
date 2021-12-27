const { Pool } = require('pg')

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'noghte-bazi',
	password: 'postgres',
	port: 5432,
})

pool.on('error', err => console.error(' ❌  postgres connection error:', err))

pool
	.query('SELECT NOW()')
	.then(
		res =>
			res.rows[0].now && console.log(` ✔️  postgres successfully connected!`),
	)
	.catch(err => console.error(' ❌  postgres connection error:', err))

pool.query(`
  CREATE TABLE IF NOT EXISTS socket_io_attachments (
    id          bigserial UNIQUE,
    created_at  timestamptz DEFAULT NOW(),
    payload     bytea
  );
  
  CREATE TABLE IF NOT EXISTS Player
  (
    Player_Id CHAR(42) NOT NULL,
    First_Name VARCHAR(20) NOT NULL,
    Last_Name VARCHAR(30) NOT NULL,
    PRIMARY KEY (Player_Id)
  );
  
  CREATE TABLE IF NOT EXISTS Game
  (
    Game_Id CHAR(42) NOT NULL,
    Turn VARCHAR(10) NOT NULL,
    Size INT NOT NULL,
    PRIMARY KEY (Game_Id)
  );
  
  CREATE TABLE IF NOT EXISTS Message
  (
    Content VARCHAR(200) NOT NULL,
    Player_Id CHAR(42) NOT NULL,
    Game_Id CHAR(42) NOT NULL,
    FOREIGN KEY (Player_Id) REFERENCES Player(Player_Id),
    FOREIGN KEY (Game_Id) REFERENCES Game(Game_Id)
  );
  
  CREATE TABLE IF NOT EXISTS History
  (
    x INT NOT NULL,
    y INT NOT NULL,
    Player_Id CHAR(42) NOT NULL,
    Game_Id CHAR(42) NOT NULL,
    PRIMARY KEY (x, y, Game_Id),
    FOREIGN KEY (Player_Id) REFERENCES Player(Player_Id),
    FOREIGN KEY (Game_Id) REFERENCES Game(Game_Id)
  );
  
  CREATE TABLE IF NOT EXISTS Plays
  (
    Score INT NOT NULL,
    Is_winner BOOL NOT NULL,
    Color VARCHAR(10) NOT NULL,
    Role VARCHAR(10) NOT NULL,
    Game_Id CHAR(42) NOT NULL,
    Player_Id CHAR(42) NOT NULL,
    PRIMARY KEY (Game_Id, Player_Id),
    FOREIGN KEY (Game_Id) REFERENCES Game(Game_Id),
    FOREIGN KEY (Player_Id) REFERENCES Player(Player_Id)
  );
  `)

exports.query = (query, params) => pool.query(query, params).catch(console.log)

exports.getClient = async () => {
	const client = await pool.connect()

	const { query: oldQuery, release: oldRelease } = client
	// monkey patch the query method to keep track of the last query executed
	client.query = (...args) => {
		client.lastQuery = args
		return oldQuery.apply(client, args)
	}

	// set a timeout of 5 seconds, after which we will log this client's last query
	const timeout = setTimeout(() => {
		console.error('A client has been checked out for more than 5 seconds!')
		console.error(
			`The last executed query on this client was: ${client.lastQuery}`,
		)
	}, 5000)

	client.release = error => {
		// call the actual 'release' method, returning this client to the pool
		oldRelease.call(client, error)
		clearTimeout(timeout)
		// set the methods back to their old un-monkey-patched versions
		client.query = oldQuery
		client.release = oldRelease
	}
	return client
}
