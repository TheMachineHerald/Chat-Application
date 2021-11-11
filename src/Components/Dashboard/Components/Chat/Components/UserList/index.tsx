import React, { useEffect, useContext, ReactElement, ContextType } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ChatContext } from "../.."
import { channelService } from "../../../../../../Services/channelService"
import User from "./components/User"
import styles from "./UserList.module.scss"

const UserList: React.FC = (): ReactElement => {
	const { userList, set_user_list } = useContext(ChatContext)
	const dashboard = useSelector((state: { dashboard: DASHBOARD_STATE }) => state.dashboard)
	const user = useSelector((state: { user: USER_STATE }) => state.user)
	const users = useSelector((state: { ch_usrs: CHANNEL_USERS_STATE }) => state.ch_usrs)
	const dispatch = useDispatch()

	const online_count = (users: Array<CHANNEL_USER>): number => {
		const online = users.filter(u => u.status === 1)
		return online.length
	}

	const offline_count = (users: Array<CHANNEL_USER>): number => {
		const offline = users.filter(u => u.status === 4)
		return offline.length
	}

	const get_channel_users = (): Promise<void> => {
		return channelService
				.getChannelUsers(dashboard.selected_server.selected_channel_id)
				.then((users: Array<CHANNEL_USER>): void => {
					dispatch({
						type: "POPULATE_CHANNEL_USERS",
						payload: users
					})
				})
				.catch((err: _Error): void => console.log(err))
	}

	useEffect(() => {
		get_channel_users()	
	}, [dashboard, user.home_selected])

	return (
		<div className={userList ? styles.userListOn : styles.userListOff}>
			<div className={styles.onlineContainer}>
				<h4>Online - {online_count(users.channel_users)}</h4>
				<div>
					{
						users.channel_users.map(usr => {
							if (usr.status === 1) {
								return <User key={usr.id} user={usr} />
							}
						})
					}
				</div>
			</div>
			<div className={styles.offlineContainer}>
				<h4>Offline - {offline_count(users.channel_users)}</h4>
				<div>
					{
						users.channel_users.map(usr => {
							if (usr.status === 4) {
								return <User key={usr.id} user={usr} />
							}
						})
					}
				</div>
			</div>
		</div>
	)
}

export default UserList