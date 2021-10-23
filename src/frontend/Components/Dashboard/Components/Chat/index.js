import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userService } from '../../../../Services/UserService/userService'
import {
  PlusCircleFilled,
  GiftFilled,
  GifOutlined,
  SmileFilled
} from '@ant-design/icons'
import ChatHeader from './Components/ChatHeader'
import Message from './Components/Message'
import styles from './Chat.module.scss'

function Chat(props) {
  const { channel_id, name } = props
  const [message, setMessage] = useState('') 
  const user = useSelector((state) => state.dashboard.user)
  const selected_channel_messages = useSelector((state) => state.dashboard.selected_channel_messages)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    return setMessage(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const ctx = {
      channel_id: channel_id,
      server_id: null,
      user_id: user.id,
      user_name: user.user_name,
      message: message
    }

    return userService
           .saveMessage(ctx)
           .then(resolve => {
             return setMessage('')
           })
           .catch(err => console.log(err))
  }

  useEffect(() => {
    console.log('rendered > chat: ', user)

    return userService
            .getChannelMessages(channel_id)
            .then(messages => {
              dispatch({
                type: "POPULATE_CHANNEL_MESSAGES",
                payload: messages
              })
            })
            .catch(err => console.log(err))
  }, [user])

  return (
    <div className={styles.chat}>
      <ChatHeader channel_name={name} />

      <div className={styles.messagesWrapper}>
        <div className={styles.messages}>
          {
            selected_channel_messages.map(msg => {
              return (
                <Message
                  key={msg.id}
                  user={msg.user_name}
                  message={msg.message}
                />
              )
            })
          }
        </div>
      </div>

      <div className={styles.input}>
        <PlusCircleFilled className={styles.antIcons} />
        <form onSubmit={handleSubmit}>
          <input
            placeholder={`Message #${name}`}
            value={message}
            onChange={handleChange}
          />
          <button type="submit">
            Send Message
          </button>
        </form>
        <div className={styles.icons}>
          <GiftFilled className={styles.antIcons}/>
          <GifOutlined className={styles.antIcons}/>
          <SmileFilled className={styles.antIcons}/>
        </div>
      </div>
    </div>
  )
}

export default Chat