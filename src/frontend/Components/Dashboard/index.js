import React, { useState, useEffect, createContext } from 'react'
import { useSelector } from 'react-redux'
import Barebones_Socket from '../../websocket'
import SidePanel from './Components/SidePanel'
import Chat from './Components/Chat'
import styles from './Dashboard.module.scss'

const _opts = {
  url: 'ws://localhost:9000',
  ping_timeout: 30000,
  pong_timeout: 30000,
  reconnect_timeout: 30000
}

const _redux = {
  save_websocket: () => {},
  set_users: () => {},
  device: null,
}

const DashbordContext = createContext(null)

function Dashboard() {
  const state = useSelector((state) => state.dashboard)
  const [socket, set_socket] = useState({})
  const [opts, set_options] = useState(_opts)
  const [redux, set_redux] = useState(_redux)

  useEffect(() => {
    set_socket(new Barebones_Socket(opts, redux))

    //init hooks
    socket.onopen = () => {
        console.log('[BareBones] > open')
    }

    socket.close = () => {
        console.log('[BareBones] > close')
    }

    socket.onmessage = (payload) => {
        if (payload.event == 'close') {
            console.log('[BareBones] > close')
            socket.close()
        }

        if (payload.event == 'pong')
            console.log('[BareBones]: Pong from Nebuchadnezzar')
    }

    socket.onreconnect = () => {
        console.log('[BareBones] > reconnect')
    }

    socket.onerror = () => {
        console.log('[BareBones] > error')
    }

  }, [state])

  return (
    <DashbordContext.Provider value={socket}>
      <div className={styles.dashboard}>
        <SidePanel />
        <Chat
          channel_id={state.user.selected_channel.channel_id} 
          name={state.user.selected_channel.channel_name}
        />
      </div>
    </DashbordContext.Provider>
  )
}

export {
  DashbordContext,
  Dashboard
}

// try {
//   this.HeartBeater = new HeartBeater(opts, redux)

//   //init hooks
//   this.HeartBeater.onopen = () => {
//     console.log('[ON OPEN HOOK::HEARTBEATER]')
//   }

//   this.HeartBeater.close = () => {
//     console.log('[ON CLOSE HOOK::HEARTBEATER]')
//   }

//   this.HeartBeater.onmessage = (payload) => {
//     console.log('[ON MESSAGE HOOK::HEARTBEATER]', payload)
//     const _payload = JSON.parse(payload.data)

//     if (_payload.event == 'close') {
//       console.log('[CLOSING SOCKET]')
//       this.HeartBeater.close()
//     }

//     if (_payload.event == 'pong') {
//       console.log('[HEARTBEATER::PONG FROM SERVER]')
//     }

//   }

//   this.HeartBeater.onreconnect = () => {
//     console.log('[ON RECONNECT HOOK::HEARTBEATER]')

//   }

//   this.HeartBeater.onerror = () => {
//     console.log('[ON ERROR HOOK::HEARTBEATER]')
//   }

// } catch (e) {
//   console.log('error initializing HeartBeater', e)
// }