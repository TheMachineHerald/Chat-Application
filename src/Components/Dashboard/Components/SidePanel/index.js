import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { DownOutlined } from "@ant-design/icons"
import ChannelsContainer from "./Components/ChannelsContainer"
import Voice from "./Components/Voice"
import  { Profile } from "./Components/Profile"
import styles from "./SidePanel.module.scss"

function SidePanel() {
	const [voiceConnected, setVoiceConnected] = useState(false)
	const user = useSelector(state => state.user)
	const server = useSelector(state => state.dashboard.selected_server)

	return (
		<div className={styles.sidePanel}>
			<div className={styles.top}>
				<h3>
					{server.server_name || user.user_name + "'s Server"}
				</h3>
				<DownOutlined className={styles.antIcons} />
			</div>

			<ChannelsContainer />
			{voiceConnected ? <Voice user={user} /> : <div></div>}
			<Profile user={user} />
		</div>
	)
}

export default SidePanel