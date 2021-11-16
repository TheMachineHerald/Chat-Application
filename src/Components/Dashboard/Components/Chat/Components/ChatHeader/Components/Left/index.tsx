import React, { ReactElement, useEffect } from "react"
import { useSelector } from "react-redux"
import { NumberOutlined, RobotFilled } from "@ant-design/icons"
import styles from "./Left.module.scss"

const Left: React.FC = (): ReactElement => {
	const user = useSelector((state: { user: USER_STATE }) => state.user)
	const dashboard = useSelector((state: { dashboard: DASHBOARD_STATE }) => state.dashboard)

	const FriendHome: React.FC = (): ReactElement => {
		return (
			<span>
				<div className={styles.friendLeftButtonStart}>
					<RobotFilled className={styles.robot}/>
					<span>Friends</span>
				</div>
				<div className={styles.friendLeftButton}>
					All
				</div>
				<div className={styles.friendLeftButton}>
					Pending
				</div>
				<div className={styles.addFriendButton}>
					Add Friend
				</div>
			</span>
		)
	}

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
				<div className={styles.channelName}>{ dashboard.selected_server.selected_channel_name }</div>
			</span>
		)
	}

	const RenderElement: React.FC = (): ReactElement => {
		switch(user.page_selection) {
			case "HOME_PAGE":
				if (user.home_page) {
					return <FriendHome />
				}
				return <Friend />
			case "FRIEND_PAGE":
				return <Friend />
			case "SERVER_PAGE":
				return <Channel />
			default:
				if (user.home_selected) {
					return <Friend />
				}
				return <Channel />
		}
	}
	return (
		<div className={styles.left}>
			<h3><RenderElement /></h3>
		</div>
	)
}

export default Left