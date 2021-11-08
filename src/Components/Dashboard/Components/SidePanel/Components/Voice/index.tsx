import React, { ReactElement } from "react"
import { useSelector } from "react-redux"
import { PhoneFilled, SignalFilled } from "@ant-design/icons"
import styles from "./Voice.module.scss"

const Voice: React.FC = (): ReactElement => {
	const user = useSelector((state: { user: USER_STATE }) => state.user)
	const dashboard = useSelector((state: { dashboard: DASHBOARD_STATE  }) => state.dashboard)

	return (
		<div className={styles.voice}>
			<SignalFilled className={styles.voiceIcon} />

			<div className={styles.info}>
				<h3>Voice Connected</h3>
				<p>#{dashboard.selected_server.selected_channel_name}/#{user.user_name}'s server</p>
			</div>

			<div className={styles.voiceIconsContainer}>
				<PhoneFilled className={styles.icon}/>
			</div>
		</div>
	)
}

export default Voice