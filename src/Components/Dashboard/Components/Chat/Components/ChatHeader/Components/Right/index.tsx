import React, { ReactElement, useContext } from "react"
import { useSelector } from "react-redux"
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
	const user = useSelector((state: { user: USER_STATE }) => state.user)
	const { userList, set_user_list } = useContext(ChatContext)

	const FriendSettings: React.FC = (): ReactElement => {
		return (
			<div className={styles.right}>
				<TeamOutlined
					className={userList ? styles.antIconsToggled : styles.antIcons}
					onClick={() => set_user_list(!userList)}
				/>
				<WechatFilled className={styles.antIcons}/>
				<InboxOutlined className={styles.antIcons}/>
				<QuestionCircleFilled className={styles.antIconsQuestion}/>
			</div>
		)
	}

	const ChannelSettings: React.FC = (): ReactElement => {
		return (
			<div className={styles.right}>
				<BellFilled className={styles.antIcons}/>
				<PushpinFilled className={styles.antIcons}/>
				<TeamOutlined
					className={userList ? styles.antIconsToggled : styles.antIcons}
					onClick={() => set_user_list(!userList)}
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

	return (
		<span>
			{ user.home_page ? <FriendSettings /> : <ChannelSettings /> }
		</span>
	)
}

export default Right