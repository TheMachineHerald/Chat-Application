import React, { ReactElement } from "react"
import date from "date-and-time"
import { Avatar } from "antd"
import { UserOutlined } from "@ant-design/icons"
import styles from "./message.module.scss"

const Message: React.FC<MESSAGE_COMPONENT_PROPS> = (props): ReactElement => {
	const parse_time = (raw: string): string => {
		date.plugin("meridiem")
		const pattern = date.compile("MMM D YYYY h:mm A")
		let tmp = ""
		let parsed = ""

		try {
			tmp = date.parse(raw, "YYYY-MM-DDTHH:mm:ss.SSS[Z]", true)
			parsed = date.format(tmp, pattern)
		} catch (e) {
			console.log(e)
		} finally {
			return parsed
		}
	}

	return (
		<div>
			{/* Conditionally render this */}
			{/* <div className={styles.line}></div> */}
			<div className={styles.message}>
				<Avatar className={styles.avatar} icon={<UserOutlined />} />
				<div className={styles.info}>
					<div className={styles.container}>
						<h4>{props.user}</h4>
						<span className={styles.timestamp}>{parse_time(props.date)}</span>
					</div>
					<p>{props.message}</p>
				</div>
			</div>
		</div>
	)
}

export default Message