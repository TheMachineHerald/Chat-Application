import React, { ReactElement, useContext } from "react"
import { ChatContext } from "../../../.."
import {
	BellFilled,
	TeamOutlined,
	SearchOutlined,
	QuestionCircleFilled,
	WechatFilled,
	InboxOutlined,
	PushpinFilled
} from "@ant-design/icons"
import styles from "./Right.module.scss"

const Right: React.FC = (): ReactElement => {
	const { user_list } = useContext(ChatContext)
	const [ userList, setUserList ] = user_list

	return (
		<div className={styles.right}>
			<BellFilled className={styles.antIcons}/>
			<PushpinFilled className={styles.antIcons}/>
			<TeamOutlined
				className={userList ? styles.antIconsToggled : styles.antIcons}
				onClick={() => setUserList(!userList)}
			/>

			<div className={styles.search}>
				<input placeholder="Search" />
				<SearchOutlined className={styles.antIcon}/>
			</div>

			<WechatFilled className={styles.antIcons}/>
			<InboxOutlined className={styles.antIcons}/>
			<QuestionCircleFilled className={styles.antIconsQuestion}/>
		</div>
	)
}

export default Right