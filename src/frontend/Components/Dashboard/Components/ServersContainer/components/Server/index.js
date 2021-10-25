import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../../../../../../Services/UserService/userService'
import styles from './Server.module.scss'

function Server(props) {
    const dispatch = useDispatch()
    const [selected, set_selected] = useState(false)
    const selected_server = useSelector((state) => state.dashboard.user.selected_server.server_id)

    const handleClick = (u_id, s_id, s_name) => {
        const ctx = {
            user_id: u_id,
            server_id: s_id,
            server_name: s_name
        }

        return userService
                    .saveSelectedServer(ctx)
                    .then(resolve => {
                          dispatch({
                              type: 'SAVE_SELECTED_SERVER',
                              payload: resolve
                          })
                    })
                    .catch(err => console.log(err))
    }

    return(
        <div
            onClick={() => handleClick(props.user_id, props.id, props.name)}
            className={selected_server == props.id ? styles.selected : styles.server}
        >

        </div>
    )
}

export default Server