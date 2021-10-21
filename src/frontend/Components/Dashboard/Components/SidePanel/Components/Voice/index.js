import React from 'react'
import { PhoneFilled, SignalFilled } from '@ant-design/icons'
import styles from './Voice.module.scss'

function Voice() {
  return (
    <div className={styles.voice}>
      <SignalFilled className={styles.voiceIcon} />

      <div className={styles.info}>
        <h3>Voice Connected</h3>
        <p>#voice_channel_name/#user_name's server</p>
      </div>

      <div className={styles.voiceIconsContainer}>
        <PhoneFilled className={styles.icon}/>
      </div>
    </div>
  )
}

export default Voice