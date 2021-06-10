import { v4 as uuidv4 } from 'uuid'
import query from './index'

export const createNewGame = size => {
  const id = uuidv4()
  query(
    `
    insert into games(id, size, created_date, turn)
    values($1, $2, $3, $4, $5, $6, $7, $8)
    
    `,
    [id, size, Date.now()],
  )
  return id
}
export const getGameById = id =>
  query(
    `
      select * from games
      where id = $1
    `,
    [id],
  ).then(({ rows }) => rows[0])
