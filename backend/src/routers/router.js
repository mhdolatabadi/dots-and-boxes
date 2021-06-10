import express from 'express'
import { getAllUser, getUserById } from '../models/user.db'

const router = express.Router()

router.get('/users', async (req, res) => {
  const users = await getAllUser()
  res.send(users)
})

router.get('/user/:id', async (req, res) => {
  const { id } = req.params
  const user = await getUserById(id)
  if (!user) res.sendStatus(404)
  else res.send(user)
})
