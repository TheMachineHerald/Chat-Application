import React from 'react'
import styles from './Left.module.scss'

function Left (props) {
  return (
    <div className={styles.left}>
      <h3>
        <span className={styles.hash}>#</span>
        {props.channel}
      </h3>
    </div>
  )
}

export default Left