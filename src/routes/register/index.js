import express from 'express'
import user_register from '../../database/register'

const router = express.Router()

router.get('/', (req, res) => {
  const user_obj = req.body

  user_register(db_connection, user_obj)
    .then(user => {
      console.log('user registered: ', user)
      return res.status(200).json({
        message: "Created User!",
        user: user
      })
    })
    .catch(err => {
      console.log(err)
      return res.status(500).json({
        status: '500', 
        error: 'Not Allowed'
      })
    })
})

export { router }