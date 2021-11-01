import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { channelService } from "../../../../../../Services/channelService"
import User from "./components/User"
import styles from "./UserList.module.scss"

function UserList() {
	const dispatch = useDispatch()
	const dashboard = useSelector(state => state.dashboard)
	const users = useSelector(state => state.ch_usrs)

	useEffect(() => {
		return channelService
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
		<div className={styles.userList}>
			<div className={styles.onlineContainer}>
				<h4>Online</h4>

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
				<h4>Offline</h4>
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