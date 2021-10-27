import React, { useState } from 'react'
import { MehOutlined, SmileOutlined } from '@ant-design/icons'
import styles from './Home.module.scss'

function Home() {
  const [hovered, set_hovered] = useState(false)

  return (
    <div
      className={styles.home}
      onMouseEnter={() => set_hovered(true)}
      onMouseLeave={() => set_hovered(false)}
    >
      { hovered ? <SmileOutlined className={styles.antIcons} /> : <MehOutlined className={styles.antIcons} /> }
    </div>
  )
}

export default Home