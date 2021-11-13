import React, { useEffect, useContext, ReactElement } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ChatContext } from "../.."
import { userService } from "../../../../../../Services/userService"
import User from "./components/User"
import styles from "./FriendList.module.scss"

const FriendList: React.FC = (): ReactElement => {
	const { userList, set_user_list } = useContext(ChatContext)
	const dashboard = useSelector((state: { dashboard: DASHBOARD_STATE }) => state.dashboard)
	const user = useSelector((state: { user: USER_STATE }) => state.user)
	const friend_list = useSelector((state: { friends: USER_FRIENDS_STATE }) => state.friends)
	const dispatch = useDispatch()

	const get_friends = (): Promise<void> => {
		return userService
				.getAllUserFriends(user.id)
				.then((resolve: Array<CHANNEL_USER>): void => {
					dispatch({
						type: "POPULATE_FRIEND_LIST",
						payload: resolve
					})
				})
				.catch((err: _Error): void => console.log(err))
	}

	useEffect(() => {
		get_friends()
	}, [dashboard, user.home_selected])

	return (
		<div className={userList ? styles.userListOn : styles.userListOff}>
			<div className={styles.onlineContainer}>
				<h4>Active Now</h4>
				<div>
					{
						friend_list.friends.map(usr => {
							if (usr.status === 1) {
								return <User key={usr.id} user={usr} />
							}
						})
					}
				</div>
			</div>
		</div>
	)
}

export default FriendList