import express from 'express'
import { router as create_channel} from './create_channel'
import { router as get_channel_messages} from './get_channel_messages'
import { get_channels } from '../../database/channels'

const router = express.Router()

router.use('/create-channel', create_channel)
router.use('/messages', get_channel_messages)

router.get('/:user_id', (req, res) => {
  const user_id = req.params.user_id

  get_channels(db_connection, user_id)
    .then(channels => {
      return res.status(200).json({
        channels: channels
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