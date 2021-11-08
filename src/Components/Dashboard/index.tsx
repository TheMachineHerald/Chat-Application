import React, { useState, useEffect, ReactElement } from "react"
import { useSelector } from "react-redux"
import { ServersContainer } from "./Components/ServersContainer"
import SidePanel from "./Components/SidePanel"
import { Chat } from "./Components/Chat"
import styles from "./Dashboard.module.scss"

const Dashboard: React.FC = (): ReactElement => {
	const state = useSelector((state: { dashboard: DASHBOARD_STATE } ) => state.dashboard)

	useEffect(() => {}, [state])
	return (
		<div className={styles.dashboard}>
			<ServersContainer />
			<SidePanel />
			<Chat />
		</div>
	)
}

export {
	Dashboard
}