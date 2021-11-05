import React, { useState, createContext} from "react"
import { SettingsModal } from "./components/SettingsModal"
import { Avatar, Image, Modal, Button } from "antd"
import {
	UserOutlined,
	AudioFilled,
	CustomerServiceFilled,
	SettingFilled
} from "@ant-design/icons"
import styles from "./Profile.module.scss"

const ProfileContext = createContext(null)

function Profile(props) {
	const [settingsVisible, setSettingsVisible] = useState(false)

	return (
		<ProfileContext.Provider value={{settings: [settingsVisible, setSettingsVisible] }}>
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
						onClick={() => setSettingsVisible(true)}
					/>
				</div>

				<div className={styles.antMoodal}>
					<SettingsModal 
						visible={settingsVisible}
						onCancel={() => setSettingsVisible(false)}
					/>
				</div>
			</div>
		</ProfileContext.Provider>
	)
}

export {
	Profile,
	ProfileContext
}