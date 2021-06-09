import { query } from './index'

export const getAllUser = () =>
  query(
    `
      select * from users
    `
  ).then(({ rows }) => rows)

export const getUserById = (id) =>
  query(
    `
      select * from users
      where id = $1

    `,
    [id]
  ).then(({ rows }) => rows[0])

export const addNewUser = ({ id, name }) =>
  query(
    `
      insert into users (id, name)
      values($1, $2
    `,
    [id, name]
  )
