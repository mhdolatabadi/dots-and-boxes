//TODO add player as new concept
import './src/routers/socket.io'

const express = require('express')
const router = require('./src/routers/router')
const config = require('./src/setup/config')
const app = express()

app.use(express.json())
app.use('/', router)

app.listen(config.server.port, () =>
  console.log(`server is listening on port ${config.server.port}`),
)
