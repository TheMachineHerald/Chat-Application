import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userService } from '../../../../../../Services/UserService/userService'
import {
  DownOutlined,
  PlusOutlined
} from '@ant-design/icons'
import SidePanelChannel from './Components/SidePanelChannel'
import styles from './ChannelsContainer.module.scss'

function ChannelsContainer() {
  const user_id = useSelector((state) => state.dashboard.user.id)
  const state = useSelector((state) => state.dashboard.channels)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('render > channels container > state: ', state)
    return userService
            .getAllChannels(user_id)
            .then(channels => {
              dispatch({ type: "SAVE_CHANNELS", payload: channels })
            })
            .catch(err => console.log(err))
  }, [])

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
            console.log('side pn channel: ', ch)
            return (
              <SidePanelChannel 
                key={ch.channels_id}
                id={ch.channels_id}
                user_id={user_id}
                channel={ch.name}
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
                key={ch.channels_id}
                id={ch.channels_id}
                user_id={user_id}
                channel={ch.name}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default ChannelsContainer