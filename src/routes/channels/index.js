import express from 'express'
import { get_channels } from '../../database/channels'
import { get_channel_messages } from '../../database/messages'

const router = express.Router()

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

//these need to be separated into different modules
router.get('/messages/:channel_id', (req, res) => {
  const channel_id = req.params.channel_id

  get_channel_messages(db_connection, channel_id)
    .then(messages => {
      console.log('get_channel_messages: ', messages)
      return res.status(200).json({
        messages: messages
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

router.post('/create-channel', (req, res) => {
  res.json({
    status: 200,
    msg: "create-channel route"
  })
})

export { router }