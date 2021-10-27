import React from 'react'
import { NumberOutlined } from '@ant-design/icons'
import styles from './Left.module.scss'

function Left (props) {
  return (
    <div className={styles.left}>
      <h3>
        <NumberOutlined className={styles.hash}/>
        {props.channel}
      </h3>
    </div>
  )
}

export default Left