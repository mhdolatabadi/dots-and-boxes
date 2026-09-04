const app = require('express')()
const http = require('http').createServer(app)
const config = require('./src/setup/config')
const { registerSocketHandlers } = require('./src/socket/handlers')

const io = require('socket.io')(http, {
  cors: {
    origin: config.server.origin,
    methods: ['GET', 'POST'],
  },
})

registerSocketHandlers(io)

http.listen(config.server.port, config.server.host, () => {
  console.log(
    `noghte-bazi backend listening on ${config.server.host}:${config.server.port}`
  )
})
