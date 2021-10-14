import express from 'express'
import { router as login_route } from './login'
import { router as register_route } from './register'

const API = express.Router()

API.use('/login', login_route)
API.use('/register', register_route)

API.get('/', (req, res) => {
  res.json({
    statusCode: 200,
    message: "API Route"
  })
})

export default API