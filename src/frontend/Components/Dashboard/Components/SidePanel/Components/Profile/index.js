import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { userService } from '../../../../../../Services/UserService/userService'
import { Avatar, Image, Modal, Button } from 'antd'
import {
  UserOutlined,
  AudioFilled,
  CustomerServiceFilled,
  SettingFilled
} from '@ant-design/icons'
import styles from './Profile.module.scss'

function Profile(props) {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = () => {
    console.log('logging user out')
    setLogoutModalVisible(false)

    return (
      userService
      .logout()
      .then(resolve => {
        history.push({
          pathname: '/login'
        })
      })
      .catch(err => {
        console.log(err)
      })
    )
  }

  return (
    <div className={styles.profile}>
      <Avatar className={styles.avatar} size="medium" icon={<UserOutlined />} />        

      <div className={styles.info}>
        <h3>{props.user.user_name}</h3>
        <p>#{props.user.id}</p>
      </div>

      <div className={styles.iconsContainer}>
        <AudioFilled className={styles.icon}/>
        <CustomerServiceFilled className={styles.icon}/>
        <SettingFilled 
          className={styles.icon}
          onClick={() => setLogoutModalVisible(true)}
        />
      </div>

      <Modal
          title="Logout"
          centered
          visible={logoutModalVisible}
          onOk={() => handleLogout()}
          onCancel={() => setLogoutModalVisible(false)}
        >
          <p>Are you sure you want to logout?</p>
      </Modal>
    </div>
  )
}

export default Profile