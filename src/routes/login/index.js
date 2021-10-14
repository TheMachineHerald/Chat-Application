import express from 'express'
import user_login from '../../database/login/login'

const router = express.Router()

router.get('/', (req, res) => {
  //sanitize data > validate(req.body)
  const { user_name, password } = req.body

  user_login(db_connection, { user_name: user_name, password: password })
    .then(resolve => {
      console.log('user logged in: ', resolve)
      return res.status(200).json({
        message: "Logged In!",
        user: resolve
      })
    })
    .catch(err => {
      //rewrite this to send error to middle ware logger
      console.log(err)
      return res.status(500).json({
        status: '500', 
        error: 'No match'
      })
    })
})

export { router }