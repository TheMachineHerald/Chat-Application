import React from 'react'
import { Avatar, Image } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import './styles.css'

function Message() {
  return (
    <div className="message">
      <Avatar size="small" icon={<UserOutlined />} />  
      <div className="message-info">
        <h4>
          TheMachineHerald
          <span className="message-timestamp">this is a timestamp</span>
        </h4>
        <p>This is a message</p>
      </div>
    </div>
  )
}

export default Message