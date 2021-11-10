import React, { ReactElement, useState } from "react"
import { useSelector } from "react-redux"
import { DownOutlined } from "@ant-design/icons"
import { FriendsContainer } from "./Components/FriendsContainer"
import ChannelsContainer from "./Components/ChannelsContainer"
import Voice from "./Components/Voice"
import  { Profile } from "./Components/Profile"
import styles from "./SidePanel.module.scss"

const SidePanel: React.FC = (): ReactElement => {
	const [voiceConnected, setVoiceConnected] = useState(false)
	const user = useSelector((state: { user: USER_STATE }) => state.user)
	const server = useSelector((state: { dashboard: DASHBOARD_STATE }) => state.dashboard.selected_server)

	const ServerHeader: React.FC = (): ReactElement => {
		return (
			<div className={styles.top}>
				<h3>
					{server.server_name || user.user_name + "'s Server"}
				</h3>
				<DownOutlined className={styles.antIcons} />
			</div>
		)
	}

	const HomeHeader: React.FC = (): ReactElement => {
		return (
			<div className={styles.top}>
				<h3>
					Friends
				</h3>
			</div>
		)
	}

	return (
		<div className={styles.sidePanel}>
			{ user.home_selected ? <HomeHeader /> : <ServerHeader /> }
			{ user.home_selected ? <FriendsContainer /> : <ChannelsContainer /> }
			{ voiceConnected ? <Voice /> : <div></div> }
			<Profile user={user} />
		</div>
	)
}

export {
	SidePanel
}