import { v4 as uuidv4 } from 'uuid'
import { query } from './index.js'

export const createNewGame = async (id, size) => {
  const currentDate = new Date()
  query(
    `
    insert into games(id, size, created_date)
    values($1, $2, $3)    
    `,
    [id, size, currentDate.toISOString()],
  )
}
export const getGameById = id =>
  query(
    `
      select * from games
      where id = $1
    `,
    [id],
  ).then(({ rows }) => rows[0])

export const getAllGame = async () =>
  query(`select * from games`).then(({ rows }) => rows)
