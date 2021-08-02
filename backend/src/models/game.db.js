import { v4 as uuidv4 } from 'uuid'
import { query } from './index.js'

export const createNewGame = async (id, size) => {
  const currentDate = new Date()
  query(
    `
    insert into games(id, size, created_date)
    values($1, $2, $3)
    on duplicate key update
    on conflict replace  
    `,
    [id, size, currentDate.toISOString()],
  )
}
const a = [
  {
    comments: [
      {
        __v: 0,
        _id: '60d68e32dff84439a4d3b191',
        comments: [
          {
            __v: 0,
            _id: '60d695b4ee10aa73f820b973',
            comments: [
              {
                __v: 0,
                _id: '60d6962cee10aa73f820b974',
                comments: [
                  {
                    __v: 0,
                    _id: '60d6ab9207c0a573786a9e65',
                    comments: [],
                    content: 'good post 3',
                    createdAt: '2021-06-26T04:22:42.337Z',
                    updatedAt: '2021-06-26T04:22:42.337Z',
                    userId: '60c418582f7066090ced4a51',
                  },
                ],
                content: 'good post 2',
                createdAt: '2021-06-26T02:51:24.111Z',
                updatedAt: '2021-06-26T04:22:42.622Z',
                userId: '60c418582f7066090ced4a51',
              },
              {
                __v: 0,
                _id: '60d705784ab01c354cf7f445',
                comments: [],
                content: 'Comment deleted by User',
                createdAt: '2021-06-26T10:46:16.813Z',
                updatedAt: '2021-06-26T12:29:06.398Z',
                userId: '60c15ac41ed8da1ab4efe7f3',
              },
              {
                __v: 0,
                _id: '60d706febcba957b04406547',
                comments: [],
                content: 'yes it is a good post 1 from alexane Updated',
                createdAt: '2021-06-26T10:52:46.679Z',
                updatedAt: '2021-06-26T12:17:58.879Z',
                userId: '60c15ac41ed8da1ab4efe7f3',
              },
            ],
            content: 'good post 1',
            createdAt: '2021-06-26T02:49:24.426Z',
            updatedAt: '2021-06-26T12:30:44.872Z',
            userId: '60c418582f7066090ced4a51',
          },
        ],
        content: 'good post',
        createdAt: '2021-06-26T02:17:22.625Z',
        updatedAt: '2021-06-26T02:49:24.820Z',
        userId: '60c418582f7066090ced4a51',
      },
      {
        __v: 0,
        _id: '60d6bebf17d0b12be44742d1',
        comments: [
          {
            __v: 0,
            _id: '60d6c2d917d0b12be44742d2',
            comments: [],
            content: 'nice post 1',
            createdAt: '2021-06-26T06:02:01.420Z',
            updatedAt: '2021-06-26T06:02:01.420Z',
            userId: '60c418582f7066090ced4a51',
          },
        ],
        content: 'nice post',
        createdAt: '2021-06-26T05:44:31.436Z',
        updatedAt: '2021-06-26T06:02:01.676Z',
        userId: '60c418582f7066090ced4a51',
      },
    ],
  },
]
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
