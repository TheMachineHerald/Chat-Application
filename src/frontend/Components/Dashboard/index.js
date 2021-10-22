import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import SidePanel from './Components/SidePanel'
import Chat from './Components/Chat'
import styles from './Dashboard.module.scss'

function Dashboard() {
  const state = useSelector((state) => state.dashboard)

  useEffect(() => {
    console.log('rendered > dashboard > state: ', state)
  }, [state])

  return (
    <div className={styles.dashboard}>
      <SidePanel />
      <Chat
        channel_id={state.user.selected_channel.channel_id} 
        name={state.user.selected_channel.channel_name}
      />
    </div>
  )
}

export default Dashboard