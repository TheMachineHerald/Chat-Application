import React, { ReactElement } from "react"
import Left from "./Components/Left"
import Right from "./Components/Right"
import styles from "./ChatHeader.module.scss"

const ChatHeader: React.FC<CHAT_HEADER_COMPONENT_PROPS> = (props): ReactElement => {
	return (
		<div className={styles.header}>
			<Left channel={props.channel_name} />
			<Right />
		</div>
	)
}

export default ChatHeader