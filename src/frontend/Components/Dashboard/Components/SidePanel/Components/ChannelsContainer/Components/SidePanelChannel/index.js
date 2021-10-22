import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styles from './SidePanelChannel.module.scss'

function SidePanelChannel(props) {
  const dispatch = useDispatch()

  const handleClick = (id, name) => {
    console.log('handle click fn')
    dispatch({
      type: "SAVE_SELECTED_CHANNEL",
      payload: {
        channel_id: id,
        channel_name: name
      }
    })
  }
  
  useEffect(() => {
    console.log('renderered > channel > props: ', props)
  }, [])

  return (
    <div onClick={() => handleClick(props.id, props.channel)} className={styles.channel}>
      <h4>
        <span className={styles.hash}>#</span>
        {props.channel}
      </h4>
    </div>
  )
}

export default SidePanelChannel