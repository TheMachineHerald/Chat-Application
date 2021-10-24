import express from 'express'
import { router as login_route } from './login'
import { router as register_route } from './register'
import { router as channels_route } from './channels'
import { router as friends_route } from './friends'

const API = express.Router()

API.use('/login', login_route)
API.use('/register', register_route)
API.use('/channels', channels_route)
API.use('/friends', friends_route)

API.get('/', (req, res) => {
    res.json({
      statusCode: 200,
      message: "API Route"
    })
})

export default API