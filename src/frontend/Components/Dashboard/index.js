import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import SidePanel from './Components/SidePanel'
import Chat from './Components/Chat'
import styles from './Dashboard.module.scss'

const _defaults = {
  channel: "general"
}

function Dashboard() {
  const [defaults, setDefaults] = useState(_defaults)
  const state = useSelector((state) => state.dashboard)

  useEffect(() => {
    console.log('rendered > dashboard > state: ', state)
  }, [state])

  return (
    <div className={styles.dashboard}>
      <SidePanel />
      <Chat channel_id={1} name={"general"}/>
    </div>
  )
}

export default Dashboard