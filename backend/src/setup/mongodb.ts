import * as mongoose from 'mongoose'
import { config } from './config'

const { url, options } = config.server.mongo
mongoose.connect(url, options)

const db = mongoose.connection
db.on('error', console.error.bind(console, ' > mongodb connection error: '))
db.once('open', () => {
	console.log(' > mongodb successfully connected! ')
})
