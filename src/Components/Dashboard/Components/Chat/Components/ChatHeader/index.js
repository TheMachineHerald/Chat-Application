import React, { useState } from "react"
import Left from "./Components/Left"
import Right from "./Components/Right"
import styles from "./ChatHeader.module.scss"

function ChatHeader(props) {
	return (
		<div className={styles.header}>
			<Left channel={props.channel_name} />
			<Right />
		</div>
	)
}

export default ChatHeader