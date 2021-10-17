import React from 'react'
import { 
  BellFilled, 
  UsergroupAddOutlined,
  SearchOutlined,
  SendOutlined,
  QuestionCircleFilled,
  WechatFilled,
  InboxOutlined,
  PushpinFilled
} from '@ant-design/icons'
import styles from './Right.module.scss'

function Right() {
  return (
    <div className={styles.right}>
      <BellFilled className={styles.antIcons}/>
      <PushpinFilled className={styles.antIcons}/>
      <UsergroupAddOutlined className={styles.antIcons}/>

      <div className={styles.search}>
        <input placeholder="Search" />
        <SearchOutlined className={styles.antIcon}/>
      </div>

      <WechatFilled className={styles.antIcons}/>
      <InboxOutlined className={styles.antIcons}/>
      <QuestionCircleFilled className={styles.antIconsQuestion}/>
    </div>
  )
}

export default Right