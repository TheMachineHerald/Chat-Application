import React from 'react'
import SidePanel from './Components/SidePanel'
import Chat from './Components/Chat'
import styles from './Dashboard.module.scss'

function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <SidePanel />
      <Chat />
    </div>
  )
}

export default Dashboard