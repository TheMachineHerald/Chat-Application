import express from 'express'
import user_logout from '../../database/logout'

const router = express.Router()

router.get('/', (req, res) => {
  user_logout(db_connection, {})
    .then(resolve => {
      console.log('user logged out: ', resolve)
      return res.status(200).json({
        message: "Logged out!"
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