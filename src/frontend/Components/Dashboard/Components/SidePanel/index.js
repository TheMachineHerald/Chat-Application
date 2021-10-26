import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DownOutlined } from '@ant-design/icons'
import ChannelsContainer from './Components/ChannelsContainer'
import Voice from './Components/Voice'
import Profile from './Components/Profile'
import styles from './SidePanel.module.scss'

function SidePanel() {
    const [voiceConnected, setVoiceConnected] = useState(false)
    const user = useSelector((state) => state.user)

    return (
      <div className={styles.sidePanel}>
        <div className={styles.top}>
          <h3>
            {user.user_name}'s server
          </h3>
          <DownOutlined className={styles.antIcons} />
        </div>
          
        <ChannelsContainer />
        {voiceConnected ? <Voice user={user} />: <div></div>}
        <Profile user={user} />
      </div>
    )
}

export default SidePanel