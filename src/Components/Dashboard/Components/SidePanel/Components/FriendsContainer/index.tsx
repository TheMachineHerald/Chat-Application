import React, { ReactElement, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { userService } from "../../../../../../Services/userService"
import {
	PlusOutlined
} from "@ant-design/icons"
import { FriendsButton } from "./components/FriendsButton"
import { SidePanelUser } from "./components/SidePanelUser"
import styles from "./FriendsContainer.module.scss"

const FriendsContainer: React.FC = (): ReactElement => {
	const user = useSelector((state: { user: USER_STATE }) => state.user)
	const container_state = useSelector((state: { friends: USER_FRIENDS_STATE }) => state.friends)
	const dispatch = useDispatch()

	useEffect(() => {
		userService
			.getAllUserFriends(user.id)
			.then((resolve: Array<CHANNEL_USER>): void => {
				dispatch({
					type: "POPULATE_USER_FRIENDS",
					payload: resolve
				})
			})
			.catch((err: _Error): void => console.log(err))
	}, [])

	return (
		<div className={styles.friends}>
			<FriendsButton />
			<div className={styles.header}>
				<div className={styles.title}>Direct Message</div>
				<PlusOutlined className={styles.addChannel} />
			</div>
			<div className={styles.list}>
			{
				container_state.friends.map(f => {
					return (
						<SidePanelUser
							key={f.id}
							user_id={user.id}
							friend_id={f.id}
							friend_user_name={f.user_name}
							is_selected={f.id === user.selected_friend_id}
						/>
					)
				})
			}
			</div>
		</div>
	)
}

export { FriendsContainer }