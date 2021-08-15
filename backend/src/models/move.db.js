import {query} from './index'

export const addNewMove = (i, j, color, playerId, gameId) =>
    query(
        `
      insert into moves (user_id, game_id, color, has_permission, is_connected, role, score)
      values($1, $2, $3, $4, $5)
    `,
        [i, j, color, playerId, gameId],
    )

export const getGameHistory = gameId =>
    query(
        `
      select * from moves
      where game_id = $1
    `,
        [gameId],
    ).then(({rows}) => rows)
