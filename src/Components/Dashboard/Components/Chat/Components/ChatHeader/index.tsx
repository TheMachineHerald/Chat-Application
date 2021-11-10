import React, { ReactElement } from "react"
import Left from "./Components/Left"
import Right from "./Components/Right"
import styles from "./ChatHeader.module.scss"

const ChatHeader: React.FC = (): ReactElement => {
	return (
		<div className={styles.header}>
			<Left />
			<Right />
		</div>
	)
}

export default ChatHeader