import React, { useState } from 'react'
import Left from './Components/Left'
import Right from './Components/Right'
import styles from './ChatHeader.module.scss'

const _defaults = {
  channel: "general"
}

function ChatHeader() {
  const [defaults, setDefaults] = useState(_defaults)

  return (
    <div className={styles.header}>
      <Left channel={defaults.channel} />
      <Right />
    </div>
  )
}

export default ChatHeader