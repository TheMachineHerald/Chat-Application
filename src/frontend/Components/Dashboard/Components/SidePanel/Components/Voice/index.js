import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { userService } from "../../../../../../Services/UserService/userService"
import { PhoneFilled, SignalFilled } from "@ant-design/icons"
import styles from "./Voice.module.scss"

function Voice(props) {
	const dispatch = useDispatch()

	useEffect(() => {

	}, [])

	return (
		<div className={styles.voice}>
			<SignalFilled className={styles.voiceIcon} />

			<div className={styles.info}>
				<h3>Voice Connected</h3>
				<p>#{props.user.selected_channel.channel_name}/#{props.user.user_name}'s server</p>
			</div>

			<div className={styles.voiceIconsContainer}>
				<PhoneFilled className={styles.icon}/>
			</div>
		</div>
	)
}

export default Voice