const { query } = require('./index')

export const addNewPlayer = (
  userId,
  gameId,
  color,
  hasPermission,
  isConnected,
  role,
  score,
) =>
  query(
    `
      insert into players (user_id, game_id, color, has_permission, is_connected, role, score)
      values($1, $2, $3, $4, $5, $6, $7)
    `,
    [userId, gameId, color, hasPermission, isConnected, role, score],
  )

export const getGamePlayers = gameId =>
  query(
    `
      select * from players
      where game_id = $1

    `,
    [gameId],
  ).then(({ rows }) => rows)
