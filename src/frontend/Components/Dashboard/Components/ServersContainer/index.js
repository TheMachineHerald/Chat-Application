import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userService } from '../../../../Services/UserService/userService'
import Home from './components/Home'
import Server from './components/Server'
import styles from './ServersContainer.module.scss'

function ServersContainer() {
    const dispatch = useDispatch()
    const state = useSelector((state) => state.dashboard)

    useEffect(() => {
      console.log('rendered > servers container > state: ', state)
    }, [state])

    return (
        <div className={styles.serversContainer}>
            <Home />

            {
              state.user.servers.map(server => {
                  return (
                    <Server
                        key={server.server_id}
                        id={server.server_id}
                        name={server.server_name}
                        user_id={state.user.id}
                    />
                  )
              })
            }
        </div>
    )
}

export {
    ServersContainer
}