//TODO add player as new concept
import express from 'express'
import router from './src/routers/router'
import config from './src/setup/config'
import './src/routers/socket.io'

const app = express()

app.use(express.json())
app.use('/', router)

app.listen(config.server.port, () =>
  console.log(`server is listening on port ${config.server.port}`),
)
