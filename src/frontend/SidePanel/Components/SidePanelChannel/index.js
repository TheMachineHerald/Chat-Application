import React from 'react'
import styles from './SidePanelChannel.module.scss'

function SidePanelChannel({ id, channel }) {
  return (
    <div className={styles.channel}>
      <h4>
        <span className={styles.hash}>#</span>
        Linux
      </h4>
    </div>
  )
}

export default SidePanelChannel