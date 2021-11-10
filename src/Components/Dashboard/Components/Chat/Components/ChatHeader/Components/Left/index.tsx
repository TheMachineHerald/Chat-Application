import React, { ReactElement } from "react"
import { useSelector } from "react-redux"
import { NumberOutlined } from "@ant-design/icons"
import styles from "./Left.module.scss"

const Left: React.FC = (): ReactElement => {
	const user = useSelector((state: { user: USER_STATE }) => state.user)
	const dashboard = useSelector((state: { dashboard: DASHBOARD_STATE }) => state.dashboard)
	
	const Friend: React.FC = (): ReactElement => {
		return (
			<span>
				<div className={styles.atSign}>@</div>
				<div className={styles.friendName}>{ user.selected_friend_user_name }</div>
			</span>
		)
	}

	const Channel: React.FC = (): ReactElement => {
		return (
			<span>
				<NumberOutlined className={styles.hash}/>
				{ dashboard.selected_server.selected_channel_name }
			</span>
		)
	}

	return (
		<div className={styles.left}>
			<h3>
				{ 
					user.home_selected
					? <Friend />
					: <Channel />
				}
			</h3>
		</div>
	)
}

export default Left