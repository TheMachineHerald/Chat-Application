import React from 'react'
import date from 'date-and-time';
import { Avatar, Image, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styles from './message.module.scss'


function Message(props) {
  const parse_time = (raw) => {
      date.plugin('meridiem')
      const pattern = date.compile('MMM D YYYY h:mm A')
      let tmp = ''
      let parsed = ''

      try {
          tmp = date.parse(raw, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]', true)
          parsed = date.format(tmp, pattern)
      } catch(e) {
          console.log(e)
      } finally {
          return parsed
      }
  }

  return (
    <div>
      {/* Conditionally render this */}
      {/* <div className={styles.line}></div> */}
      <div className={styles.message}>
        <Avatar className={styles.avatar} size="medium" icon={<UserOutlined />} />  
        <div className={styles.info}>
          <div className={styles.container}>
            <h4>{props.user}</h4>
            <span className={styles.timestamp}>{parse_time(props.date).toString()}</span>
          </div>
          <p>{props.message}</p>
        </div>
      </div>
    </div>
  )
}

export default Message