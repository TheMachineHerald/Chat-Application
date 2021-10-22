import React from 'react'
import styles from './SidePanelChannel.module.scss'

function SidePanelChannel(props) {
  return (
    <div className={styles.channel}>
      <h4>
        <span className={styles.hash}>#</span>
        {props.channel}
      </h4>
    </div>
  )
}

export default SidePanelChannel