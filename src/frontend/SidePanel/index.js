import React from 'react'
import { DownCircleFilled, DownCircleOutlined, DownOutlined } from '@ant-design/icons'
import { SignalFilled } from '@ant-design/icons'
import { PlusCircleFilled, PlusOutlined } from '@ant-design/icons'
import { PhoneFilled, InfoCircleOutlined } from '@ant-design/icons'
import { Avatar, Image } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { SettingFilled, CustomerServiceFilled, AudioFilled } from '@ant-design/icons'
import SidePanelChannel from './Components/SidePanelChannel'
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

      <div className={styles.channels}>
        <div className={styles.header}>
          <div className={styles.title}>
            <DownOutlined className={styles.antIcons}/>
            <h4>Text Channels</h4>
          </div>

          <PlusOutlined className={styles.addChannel} />
        </div>

        <div className={styles.list}>
          <SidePanelChannel />
          <SidePanelChannel />
          <SidePanelChannel />
          <SidePanelChannel />
        </div>
      </div>

      <div className={styles.voice}>
        <SignalFilled className={styles.voiceIcon} />

        <div className={styles.info}>
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>  

        <div className={styles.voiceIconsContainer}>
          <PhoneFilled className={styles.icon}/>
        </div>

      </div>
      <div className={styles.profile}>
          <Avatar className={styles.avatar} size="small" icon={<UserOutlined />} />        

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
    </div>
  )
}

export default SidePanel