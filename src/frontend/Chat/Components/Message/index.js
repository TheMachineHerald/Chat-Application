import React from 'react'
import { Avatar, Image, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styles from './message.module.scss'

function Message() {
  return (
    <div className={styles.message}>
      <Avatar size="small" icon={<UserOutlined />} />  
      <div className={styles.info}>
        <h4>
          TheMachineHerald
          <span className={styles.timestamp}>this is a timestamp</span>
        </h4>
        <p>This is a message</p>
      </div>
    </div>
  )
}

export default Message