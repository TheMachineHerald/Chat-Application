import express from 'express'
import { router as login_route } from './login'

const API = express.Router()

API.use('/login', login_route)

API.get('/', (req, res) => {
  res.json({
    statusCode: 200,
    message: "API Route"
  })
})

export { API }