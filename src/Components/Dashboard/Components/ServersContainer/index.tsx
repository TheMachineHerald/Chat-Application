import React, { ReactElement, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Home } from "./components/Home"
import { Server } from "./components/Server"
import styles from "./ServersContainer.module.scss"

const ServersContainer: React.FC = (): ReactElement => {
	const dispatch = useDispatch()
	const dashboard = useSelector((state: { dashboard: DASHBOARD_STATE }) => state.dashboard)
	const user = useSelector((state: { user: USER_STATE }) => state.user)

	useEffect(() => {}, [dashboard])

	return (
		<div className={styles.serversContainer}>
			<Home />

			{
				dashboard.servers.map(server => {
					return (
						<Server
							key={server.server_id}
							id={server.server_id}
							name={server.server_name}
							user_id={user.id}
						/>
					)
				})
			}
		</div>
	)
}

export {
	ServersContainer
}