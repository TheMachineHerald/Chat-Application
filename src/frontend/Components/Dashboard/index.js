import React, { useState, useEffect, createContext } from 'react'
import { useSelector } from 'react-redux'
import { ServersContainer } from './Components/ServersContainer'
import SidePanel from './Components/SidePanel'
import Chat from './Components/Chat'
import Barebones_Socket from '../../websocket'
import styles from './Dashboard.module.scss'
import ChannelsContainer from './Components/SidePanel/Components/ChannelsContainer'

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
            <ServersContainer />
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