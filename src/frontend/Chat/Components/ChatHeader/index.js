import React from 'react'
import { 
  BellFilled, 
  UsergroupAddOutlined, 
  EnvironmentFilled, 
  SearchOutlined,
  SendOutlined,
  QuestionCircleFilled,
  WechatFilled,
  InboxOutlined
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
        <BellFilled className={styles.antIcons}/>
        <EnvironmentFilled className={styles.antIcons}/>
        <UsergroupAddOutlined className={styles.antIcons}/>

        <div className={styles.search}>
          <input placeholder="Search" />
          <SearchOutlined className={styles.antIcon}/>
        </div>

        <WechatFilled className={styles.antIcons}/>
        <InboxOutlined className={styles.antIcons}/>
        <QuestionCircleFilled className={styles.antIconsQuestion}/>
      </div>
    </div>
  )
}

export default ChatHeader