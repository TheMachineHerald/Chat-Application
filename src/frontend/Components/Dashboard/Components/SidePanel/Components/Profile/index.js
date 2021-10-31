import React, { useState, useContext } from "react"
import { useHistory } from "react-router"
import { useDispatch } from "react-redux"
import { DashboardContext } from "../../../.."
import { userService } from "../../../../../../Services/UserService/userService"
import { Avatar, Image, Modal, Button } from "antd"
import {
	UserOutlined,
	AudioFilled,
	CustomerServiceFilled,
	SettingFilled
} from "@ant-design/icons"
import styles from "./Profile.module.scss"

function Profile(props) {
	const [logoutModalVisible, setLogoutModalVisible] = useState(false)
	const socket = useContext(DashboardContext)
	const dispatch = useDispatch()
	const history = useHistory()

	const handleLogout = () => {
		setLogoutModalVisible(false)

		return userService
			.logout()
			.then(resolve => {
				socket.close(1000, "USER_LOGOUT")
				dispatch({ type: "USER_LOGOUT" })
				history.push({ pathname: "/login" })
			})
			.catch(err => {
				console.log(err)
			})
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