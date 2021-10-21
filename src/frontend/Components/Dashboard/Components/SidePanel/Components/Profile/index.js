import React from 'react'
import { Avatar, Image } from 'antd'
import {
  UserOutlined,
  AudioFilled,
  CustomerServiceFilled,
  SettingFilled
} from '@ant-design/icons'
import styles from './Profile.module.scss'

function Profile() {
  return (
    <div className={styles.profile}>
      <Avatar className={styles.avatar} size="medium" icon={<UserOutlined />} />        

      <div className={styles.info}>
        <h3>@TheMachineHerald</h3>
        <p>#thisIsMyID</p>
      </div>

      <div className={styles.iconsContainer}>
        <AudioFilled className={styles.icon}/>
        <CustomerServiceFilled className={styles.icon}/>
        <SettingFilled className={styles.icon}/>
      </div>
    </div>
  )
}

export default Profile