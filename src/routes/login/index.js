import express from 'express'
import user_login from '../../database/login'

const router = express.Router()

router.get('/', (req, res) => {
  //sanitize data > validate(req.body)
  const { userName, password } = req.body

  user_login(db_connection, { userName: userName, password: password })
    .then(resolve => {
      return res.status(200).json({
        message: "Logged In!",
        user:results[0]
      })
    })
    .catch(err => {
      return res.status(500).json({
        status: '500', 
        error: 'No match'
      })
    })
})

export { router }