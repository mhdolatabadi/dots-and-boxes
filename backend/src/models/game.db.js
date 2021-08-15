import {query} from './index.js'

export const createNewGame = async (id, size) => {
    const currentDate = new Date()
    await query(
        `
    insert into games(id, size, created_date)
    values($1, $2, $3)
    on duplicate key update
    on conflict replace  
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
    ).then(({rows}) => rows[0])

export const getAllGame = async () =>
    query(`select * from games`).then(({rows}) => rows)
