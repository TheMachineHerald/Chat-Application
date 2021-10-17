import React from 'react'
import { Avatar, Image, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styles from './message.module.scss'

function Message() {
  return (
    <div className={styles.message}>
      <Avatar className={styles.avatar} size="small" icon={<UserOutlined />} />  
      <div className={styles.info}>
        <h4>
          TheMachineHerald
          <span className={styles.timestamp}>Today at 5:00 AM</span>
        </h4>
        <p>How about them apples, Paul?</p>
      </div>
    </div>
  )
}

export default Message