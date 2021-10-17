import React from 'react'
import { DownOutlined } from '@ant-design/icons'
import ChannelsContainer from './Components/ChannelsContainer'
import Voice from './Components/Voice'
import Profile from './Components/Profile'
import styles from './SidePanel.module.scss'


function SidePanel() {
  return (
    <div className={styles.sidePanel}>
      <div className={styles.top}>
        <h3>
          Top SidePanel
        </h3>
        <DownOutlined className={styles.antIcons} />
      </div>
         
      <ChannelsContainer />
      <Voice />
      <Profile />
    </div>
  )
}

export default SidePanel