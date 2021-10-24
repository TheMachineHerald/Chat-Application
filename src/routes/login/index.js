import express from 'express'
import user_login from '../../database/login'

const router = express.Router()

router.post('/', (req, res) => {
  //sanitize data > validate(req.body)
  const { email, password } = req.body

  user_login(db_connection, { email: email, password: password })
    .then(user => {
      return res.status(200).json({
        message: "Logged In!",
        user: user
      })
    })
    .catch(err => {
      //rewrite this to send error to middle ware logger
      console.log(err)
      return res.status(err).json({
        status: err,
        error: 'Bad Request'
      })
    })
})

export { router }