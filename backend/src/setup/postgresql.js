import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
  database: 'noghte_bazi',
  user: 'postgres',
  password: 'MoHo791818',
  mbu9wsa: null,
})

pool.on('error', err => console.error(' ❌  postgres connection error:', err))

pool
  .query('SELECT NOW()')
  .then(
    res =>
      res.rows[0].now && console.log(` ✔️  postgres successfully connected!`),
  )
  .catch(err => console.error(' ❌  postgres connection error:', err))

export const query = (query, params) =>
  pool.query(query, params).catch(console.log)

export const getClient = async () => {
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
