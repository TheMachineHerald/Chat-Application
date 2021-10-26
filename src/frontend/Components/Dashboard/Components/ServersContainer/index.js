import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userService } from '../../../../Services/UserService/userService'
import Home from './components/Home'
import Server from './components/Server'
import styles from './ServersContainer.module.scss'

function ServersContainer() {
    const dispatch = useDispatch()
    const dashboard = useSelector((state) => state.dashboard)
    const user = useSelector((state) => state.user)

    useEffect(() => {
      
    }, [dashboard])

    return (
        <div className={styles.serversContainer}>
            <Home />

            {
              dashboard.servers.map(server => {
                  return (
                    <Server
                        key={server.server_id}
                        id={server.server_id}
                        name={server.server_name}
                        user_id={user.id}
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