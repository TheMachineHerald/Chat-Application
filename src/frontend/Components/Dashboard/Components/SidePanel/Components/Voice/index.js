import React, { useState } from 'react'
import { PhoneFilled, SignalFilled } from '@ant-design/icons'
import styles from './Voice.module.scss'

const _defaults = {
  channel: "general",
  user: {
    user_name: "SpaceCowboy",
    id: 42069
  }
}

function Voice() {
  const [defaults, setDefaults] = useState(_defaults) 

  return (
    <div className={styles.voice}>
      <SignalFilled className={styles.voiceIcon} />

      <div className={styles.info}>
        <h3>Voice Connected</h3>
        <p>#{defaults.channel}/#{defaults.user.user_name}'s server</p>
      </div>

      <div className={styles.voiceIconsContainer}>
        <PhoneFilled className={styles.icon}/>
      </div>
    </div>
  )
}

export default Voice