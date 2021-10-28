import React from 'react'
import { useSelector } from 'react-redux'
import {
  DownOutlined,
  PlusOutlined
} from '@ant-design/icons'
import SidePanelChannel from './Components/SidePanelChannel'
import styles from './ChannelsContainer.module.scss'

function ChannelsContainer() {
    const user_id = useSelector((state) => state.user.id)
    const state = useSelector((state) => state.dashboard.selected_server.channels)

    return (
      <div className={styles.channels}>
        {/* Start of Text Channel */}
        <div className={styles.header}>
          
          <div className={styles.title}>
            <DownOutlined className={styles.antIcons} />
            <h4>Text Channels</h4>
          </div>

          <PlusOutlined className={styles.addChannel} />
        </div>

        <div className={styles.list}>
            {
                state.text.map(ch => {
                    return (
                        <SidePanelChannel 
                          key={ch.id}
                          id={ch.id}
                          user_id={user_id}
                          channel={ch.channel_name}
                          is_selected={ch.is_selected}
                          type={ch.type}
                        />
                    )
                })
            }
        </div>

        {/* Start of Voice Channel */}
        <div className={styles.header}>
          
          <div className={styles.title}>
            <DownOutlined className={styles.antIcons} />
            <h4>Voice Channels</h4>
          </div>

          <PlusOutlined className={styles.addChannel} />
        </div>

        <div className={styles.list}>
            {
                state.voice.map(ch => {
                    return (
                        <SidePanelChannel
                          key={ch.id}
                          id={ch.id}
                          user_id={user_id}
                          channel={ch.channel_name}
                          is_selected={ch.is_selected}
                          type={ch.type}
                        />
                    )
                })
            }
        </div>
      </div>
    )
}

export default ChannelsContainer