import React, { ReactElement, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./SidePanelUser.module.scss"

const SidePanelUser: React.FC<any> = (props): ReactElement => {
	const server_id = useSelector((state: { dashboard: DASHBOARD_STATE }) => state.dashboard.selected_server.server_id)
	const dispatch = useDispatch()

	const handleClick = (id: number): Promise<void> => {
		const ctx: any = {
			selected_server_id: server_id,
			channel_id: id,
			user_id: props.user_id
		}

		return
	}

	return (
		<div
			onClick={() => handleClick(props.id)}
			className={styles.sidePanelUser}
		>
			<h4 className={ props.is_selected ? styles.active : styles.inactive }>
				{props.user_name}
			</h4>
		</div>
	)
}

export { SidePanelUser }