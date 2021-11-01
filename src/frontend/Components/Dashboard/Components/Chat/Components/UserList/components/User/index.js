import React from "react"
import { Avatar, Image, message } from "antd"
import { UserOutlined } from "@ant-design/icons"
import styles from "./User.module.scss"

function User(props) {
	return (
		<div className={styles.user}>
			<Avatar className={styles.avatar} size="small" icon={<UserOutlined />} />
			<p className={props.user.status === 4 ? styles.offline : styles.online}>
				{props.user.user_name}
			</p>
		</div>
	)
}

export default User