import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../../../../../../../../Services/UserService/userService'
import styles from './SidePanelChannel.module.scss'

function SidePanelChannel(props) {
  const selected_id = useSelector((state) => state.dashboard.user.selected_channel.channel_id)
  const dispatch = useDispatch()

  const handleClick = (user_id, id, name) => {
    const ctx = {
      user_id: user_id,
      channel_id: id,
      channel_name: name
    }
    dispatch({
      type: "SAVE_SELECTED_CHANNEL",
      payload: {
        channel_id: id,
        channel_name: name
      }
    })

    console.log('ctx to userService: ', ctx)
    return userService
            .saveSelectedChannel(ctx)
            .then(resolve => console.log(resolve))
            .catch(err => console.log(err))    
  }
  
  useEffect(() => {
    console.log('renderered > channel > props: ', props)
  }, [])

  return (
    <div 
      onClick={() => handleClick(props.user_id, props.id, props.channel)}
      className={styles.channel}
    >
      <h4 className={ selected_id == props.id ? styles.active : styles.inactive }>
        <span className={styles.hash}>#</span>
        {props.channel}
      </h4>
    </div>
  )
}

export default SidePanelChannel