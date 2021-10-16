import React from 'react'
import { 
  BellFilled, 
  UsergroupAddOutlined, 
  EnvironmentFilled, 
  SearchOutlined,
  SendOutlined,
  QuestionCircleFilled
} from '@ant-design/icons'
import styles from './ChatHeader.module.scss'

function ChatHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <h3>
          <span className={styles.hash}>#</span>
          Test Channel Name
        </h3>
      </div>
      <div className={styles.right}>
        <BellFilled />
        <EnvironmentFilled />
        <UsergroupAddOutlined />

        <div className={styles.search}>
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