import React from 'react'
import { PlusCircleFilled, GiftOutlined, GifOutlined, SmileFilled } from '@ant-design/icons'
import ChatHeader from './Components/ChatHeader'
import Message from './Components/Message'
import './styles.css'

function Chat() {
  return (
    <div className="chat">
      <ChatHeader />

      <div className="chat-messages">
        <Message 
        
        />
      </div>

      <div className="chat-input">
        <PlusCircleFilled style={{fontSize: 'large' }} />
        <form>
          <input placeholder={`Message #TESTCHANNEL`} />
          <button className="chat-input-button" type="submit">
            Send Message
          </button>
        </form>
        <div className="chat-input-icons">
          <GiftOutlined />
          <GifOutlined />
          <SmileFilled />
        </div>
      </div>
    </div>
  )
}

export default Chat