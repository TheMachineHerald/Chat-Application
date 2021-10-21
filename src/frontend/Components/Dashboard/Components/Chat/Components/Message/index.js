import React from 'react'
import { Avatar, Image, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styles from './message.module.scss'

function Message() {
  return (
    <div className={styles.message}>
      <Avatar className={styles.avatar} size="medium" icon={<UserOutlined />} />  
      <div className={styles.info}>
        <div className={styles.container}>
          <h4>TheMachineHerald</h4>
          <span className={styles.timestamp}>Today at 5:00 AM</span>
        </div>
        <p>How about them apples, Paul?</p>
      </div>
    </div>
  )
}

export default Message