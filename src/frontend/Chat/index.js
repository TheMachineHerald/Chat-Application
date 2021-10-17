import React from 'react'
import { PlusCircleFilled, GiftFilled, GifOutlined, SmileFilled } from '@ant-design/icons'
import ChatHeader from './Components/ChatHeader'
import Message from './Components/Message'
import styles from './Chat.module.scss'

function Chat() {
  return (
    <div className={styles.chat}>
      <ChatHeader />

      <div className={styles.messages}>
        <Message 
        
        />
      </div>

      <div className={styles.input}>
        <PlusCircleFilled className={styles.antIcons} />
        <form>
          <input placeholder={`Message #Linux`} />
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