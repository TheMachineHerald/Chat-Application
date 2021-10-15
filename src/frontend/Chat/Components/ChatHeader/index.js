import React from 'react'
import { 
  BellFilled, 
  UsergroupAddOutlined, 
  EnvironmentFilled, 
  SearchOutlined,
  SendOutlined,
  QuestionCircleFilled
} from '@ant-design/icons'
import './styles.css'

function ChatHeader() {
  return (
    <div className="chat-header">
      <div className="chat-header-left">
        <h3>
          <span className="chat-header-hash">#</span>
          Test Channel Name
        </h3>
      </div>
      <div className="chat-header-right">
        <BellFilled />
        <EnvironmentFilled />
        <UsergroupAddOutlined />

        <div className="chat-header-search">
          <input placeholder="Search" />
          <SearchOutlined />
        </div>

        <SendOutlined />
        <QuestionCircleFilled />
      </div>
    </div>
  )
}

export default ChatHeader