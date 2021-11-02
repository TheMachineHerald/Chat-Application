import React, { useState, useEffect, createContext } from "react"
import { useSelector } from "react-redux"
import { ServersContainer } from "./Components/ServersContainer"
import SidePanel from "./Components/SidePanel"
import { Chat } from "./Components/Chat"
import Barebones_Socket from "../../websocket"
import styles from "./Dashboard.module.scss"

const DashboardContext = createContext(null)

function Dashboard() {
	const state = useSelector(state => state.dashboard)
	const user = useSelector(state => state.user)
	const [socket, set_socket] = useState({})

	useEffect(() => {}, [state])

	return (
		<DashboardContext.Provider value={socket}>
			<div className={styles.dashboard}>
				<ServersContainer />
				<SidePanel />
				<Chat
					channel_id={state.selected_server.selected_channel_id}
					name={state.selected_server.selected_channel_name}
				/>
			</div>
		</DashboardContext.Provider>
	)
}

export {
	DashboardContext,
	Dashboard
}