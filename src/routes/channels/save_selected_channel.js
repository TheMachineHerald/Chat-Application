import express from 'express'
import { save_selected_channel } from '../../database/channels'

const router = express.Router()

router.post('/', (req, res) => {
  const { user_id, channel_id, channel_name } = req.body

  save_selected_channel(db_connection, { user_id, channel_id, channel_name })
    .then(resolve => {
      console.log('save_selected_channel: ', resolve)
      return res.status(200).json({
        message: "Saved selected channel"
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