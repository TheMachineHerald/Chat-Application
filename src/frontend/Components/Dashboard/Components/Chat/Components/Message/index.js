import React from 'react'
import { Avatar, Image, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styles from './message.module.scss'

function Message(props) {
  return (
    <div>
      {/* Conditionally render this */}
      {/* <div className={styles.line}></div> */}
      <div className={styles.message}>
        <Avatar className={styles.avatar} size="medium" icon={<UserOutlined />} />  
        <div className={styles.info}>
          <div className={styles.container}>
            <h4>{props.user}</h4>
            <span className={styles.timestamp}>Today at 5:00 AM</span>
          </div>
          <p>{props.message}</p>
        </div>
      </div>
    </div>
  )
}

export default Message

//new Date(timestamp?.toDate().toUTCString())