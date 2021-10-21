import express from 'express'
import user_register from '../../database/register'

const router = express.Router()

router.post('/', (req, res) => {
  const user_obj = req.body

  console.log("register route: ", user_obj)
  user_register(db_connection, user_obj)
    .then(user => {
      console.log("get_user in user_register: ", user)
      return res.status(200).json({
        message: "Created User!",
        user: user
      })
    })
    .catch(err => {
      console.log('user_register err: ', err)

      if (err === -1) {
          return res.status(404).json({
            status: 404, 
            error: 'Invalid Request'
          })
      }

      return res.status(500).json({
        status: 500, 
        error: 'Not Allowed'
      })
    })
})

export { router }