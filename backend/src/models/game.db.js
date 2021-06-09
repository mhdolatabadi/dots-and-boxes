import { v4 as uuidv4 } from 'uuid'
import query from './index'

export const createNewGame = (size, turn) =>
  query(
    `
      insert into games(id, is_ended, is_waited, size, created_date, end_date, turn, winner)
      values($1, $2, $3, $4, $5, $6, $7, $8)
    
    `,
    [uuidv4(), false, true, size, Date.now(), null, turn, null]
  )

export const getGameById = (id) =>
  query(
    `
      select * from games
      where id = $1
    `,
    [id]
  ).then(({ rows }) => rows[0])
