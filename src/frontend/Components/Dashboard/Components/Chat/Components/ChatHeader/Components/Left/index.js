import React from 'react'
import styles from './Left.module.scss'

function Left () {
  return (
    <div className={styles.left}>
      <h3>
        <span className={styles.hash}>#</span>
        Linux
      </h3>
    </div>
  )
}

export default Left