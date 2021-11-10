import React, { ReactElement, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { userService } from "../../../../../../Services/userService"
import {
	PlusOutlined
} from "@ant-design/icons"
import { SidePanelUser } from "./components/SidePanelUser"
import styles from "./FriendsContainer.module.scss"

const FriendsContainer: React.FC = (): ReactElement => {
	const user_id = useSelector((state: { user: USER_STATE }) => state.user.id)
	const state = useSelector((state: { dashboard: DASHBOARD_STATE }) => state.dashboard.selected_server.channels)
	const container_state = useSelector((state: { friends: USER_FRIENDS_STATE }) => state.friends)
	const dispatch = useDispatch()

	useEffect(() => {
		console.log("rendered > friends container")

		userService
			.getAllUserFriends(user_id)
			.then((friends: Array<CHANNEL_USER>): void => {
				//run dispatch here
				console.log("FRIENDS: ", friends)
				dispatch({
					type: "POPULATE_USER_FRIENDS",
					payload: friends
				})
			})
			.catch((err: _Error): void => console.log(err))
	}, [container_state])

	return (
		<div className={styles.friends}>
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
							user={f}
							user_id={f.id}
							is_selected={"false"}
						/>
					)
				})
			}
			</div>
		</div>
	)
}

export { FriendsContainer }