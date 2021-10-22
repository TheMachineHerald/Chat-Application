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
  const user = useSelector((state) => state.dashboard.user)
  const selected_channel_messages = useSelector((state) => state.dashboard.selected_channel_messages)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('rendered > chat: ', user)

    userService
      .getChannelMessages(channel_id)
      .then(messages => {
        dispatch({
          type: "POPULATE_CHANNEL_MESSAGES",
          payload: messages
        })
      })
      .catch(err => console.log(err))

  }, [])

  return (
    <div className={styles.chat}>
      <ChatHeader channel_name={name} />

      <div className={styles.messages}>
        {
          selected_channel_messages.map(msg => {
            return (
              <Message 
                user={msg.user_name}
                message={msg.message}
              />
            )
          })
        }
      </div>

      <div className={styles.input}>
        <PlusCircleFilled className={styles.antIcons} />
        <form>
          <input placeholder={`Message #${name}`} />
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