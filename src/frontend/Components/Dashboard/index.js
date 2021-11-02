import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { ServersContainer } from "./Components/ServersContainer"
import SidePanel from "./Components/SidePanel"
import { Chat } from "./Components/Chat"
import Barebones_Socket from "../../websocket"
import styles from "./Dashboard.module.scss"

function Dashboard() {
	const state = useSelector(state => state.dashboard)

	useEffect(() => {}, [state])
	return (
		<div className={styles.dashboard}>
			<ServersContainer />
			<SidePanel />
			<Chat
				channel_id={state.selected_server.selected_channel_id}
				name={state.selected_server.selected_channel_name}
			/>
		</div>
	)
}

export {
	Dashboard
}