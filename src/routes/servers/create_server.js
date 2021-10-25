import express from 'express'
import { create_server } from '../../database/servers'

const router = express.Router()

router.post('/', (req, res) => {
  res.json({
    status: 200,
    msg: "create-server route"
  })
})

export { router }