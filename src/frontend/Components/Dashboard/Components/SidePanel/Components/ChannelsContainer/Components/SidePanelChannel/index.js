import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../../../../../../../../Services/UserService/userService'
import { NumberOutlined } from '@ant-design/icons'
import styles from './SidePanelChannel.module.scss'

function SidePanelChannel(props) {
    const server_id = useSelector((state) => state.dashboard.selected_server.server_id)
    const dispatch = useDispatch()

    const handleClick = (id) => {
      const ctx = {
          selected_server_id: server_id,
          channel_id: id,
          user_id: props.user_id
      }

      return userService
                .saveSelectedChannel(ctx)
                .then(resolve => {
                      dispatch({
                          type: "SAVE_SELECTED_CHANNEL",
                          payload: resolve.channels
                      })
                })
                .catch(err => console.log(err))    
    }

    return (
      <div 
        onClick={() => handleClick(props.id)}
        className={styles.channel}
      >
        <h4 className={ props.is_selected ? styles.active : styles.inactive }>
          <NumberOutlined className={styles.hash}/>
          {props.channel}
        </h4>
      </div>
    )
}

export default SidePanelChannel