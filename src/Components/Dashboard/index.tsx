import React, { useEffect, ReactElement } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ServersContainer } from "./Components/ServersContainer"
import { SidePanel } from "./Components/SidePanel"
import { Chat } from "./Components/Chat"
import styles from "./Dashboard.module.scss"

const Dashboard: React.FC = (): ReactElement => {
	const state = useSelector((state: { dashboard: DASHBOARD_STATE }) => state.dashboard)
	const dispatch = useDispatch()
	
	useEffect(() => {
		console.log("[DASHBOARD][RENDERED]")
		dispatch({ type: "PAGE_LOAD" })
	}, [])

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