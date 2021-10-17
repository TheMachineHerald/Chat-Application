import React from 'react'
import {
  DownOutlined,
  PlusOutlined
} from '@ant-design/icons'
import SidePanelChannel from './Components/SidePanelChannel'
import styles from './ChannelsContainer.module.scss'

function ChannelsContainer() {
  return (
    <div className={styles.channels}>
      <div className={styles.header}>
        
        <div className={styles.title}>
          <DownOutlined className={styles.antIcons} />
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
  )
}

export default ChannelsContainer