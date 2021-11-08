import React, { useEffect, useContext, ReactElement } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ChatContext } from "../.."
import { channelService } from "../../../../../../Services/channelService"
import User from "./components/User"
import styles from "./UserList.module.scss"

const UserList: React.FC = (): ReactElement => {
	const { user_list } = useContext(ChatContext)
	const [ userList ] = user_list
	const dashboard = useSelector((state: { dashboard: DASHBOARD_STATE }) => state.dashboard)
	const users = useSelector((state: { ch_usrs: CHANNEL_USERS_STATE }) => state.ch_usrs)
	const dispatch = useDispatch()

	const online_count = (users) => {
		const online = users.filter(u => u.status === 1)
		return online.length
	}

	const offline_count = (users) => {
		const offline = users.filter(u => u.status === 4)
		return offline.length
	}

	useEffect(() => {
		channelService
			.getChannelUsers(dashboard.selected_server.selected_channel_id)
			.then(users => {
				dispatch({
					type: "POPULATE_CHANNEL_USERS",
					payload: users
				})
			})
			.catch(err => console.log(err))
	}, [dashboard])

	return (
		<div className={userList ? styles.userListOn : styles.userListOff}>
			<div className={styles.onlineContainer}>
				<h4>Online - {online_count(users.channel_users)}</h4>

				<div>
					{
						users.channel_users.map(usr => {
							if (usr.status === 1) {
								return <User key={usr.id} user={usr}/>
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
								return <User key={usr.id} user={usr}/>
							}
						})
					}
				</div>
			</div>
		</div>
	)
}

export default UserList