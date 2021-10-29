import React, { useState, useEffect, createContext } from 'react'
import { useSelector } from 'react-redux'
import { ServersContainer } from './Components/ServersContainer'
import SidePanel from './Components/SidePanel'
import Chat from './Components/Chat'
import Barebones_Socket from '../../websocket'
import styles from './Dashboard.module.scss'

const LOCAL_HOST = `ws://localhost:9000`

const _opts = {
    url: LOCAL_HOST,
    ping_timeout: 30000,
    pong_timeout: 30000,
    reconnect_timeout: 30000
}

const _redux = {
    save_websocket: () => {},
    set_users: () => {},
    device: null
}

const DashboardContext = createContext(null)

function Dashboard() {
    const state = useSelector((state) => state.dashboard)
    const user = useSelector((state) => state.user)
    const [socket, set_socket] = useState({})
    const [opts, set_options] = useState(_opts)
    const [redux, set_redux] = useState(_redux)

    useEffect(() => {
        const client = {
            id: user.id,
            user_name: user.user_name
        }
        set_socket(new Barebones_Socket(opts, client))

        //init hooks
        socket.onopen = () => {
            console.log('[BareBones] > open')
        }

        socket.close = (code, reason) => {
            console.log(`[BareBones] [${code}] [${reason}]`)
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
        <DashboardContext.Provider value={socket}>
          <div className={styles.dashboard}>
            <ServersContainer />
            <SidePanel />
            <Chat
              channel_id={state.selected_server.selected_channel_id} 
              name={state.selected_server.selected_channel_name}
            />
          </div>
        </DashboardContext.Provider>
    )
}

export {
  DashboardContext,
  Dashboard
}