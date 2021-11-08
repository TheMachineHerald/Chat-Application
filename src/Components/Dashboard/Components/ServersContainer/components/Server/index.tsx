import React, { ReactElement, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userService } from "../../../../../../Services/userService"
import { FolderFilled, FolderOpenFilled } from "@ant-design/icons"
import styles from "./Server.module.scss"

const Server: React.FC<SERVER_COMPONENT_PROPS> = (props): ReactElement => {
	const [hovered, set_hovered] = useState(false)
	const dispatch = useDispatch()
	const selected_server = useSelector((state: { dashboard: DASHBOARD_STATE }) => state.dashboard.selected_server)

	const handleClick = (u_id, s_id, s_name): Promise<void> => {
		const ctx: SERVER_REQUEST = {
			user_id: u_id,
			server_id: s_id,
			server_name: s_name
		}

		return userService
				.saveSelectedServer(ctx)
				.then((resolve: SELECTED_SERVER): void => {
					dispatch({
						type: "UPDATE_SELECTED_SERVER",
						payload: resolve
					})
				})
				.catch((err: _Error): void => console.log(err))
	}

	return (
		<div
			onClick={() => handleClick(props.user_id, props.id, props.name)}
			onMouseEnter={() => set_hovered(true)}
			onMouseLeave={() => set_hovered(false)}
			className={selected_server.server_id == props.id ? styles.selected : styles.server}
		>
			{
				hovered || (selected_server.server_id == props.id)
				? <FolderOpenFilled className={styles.antIcons}/>
				: <FolderFilled className={styles.antIcons}/>
			}
		</div>
	)
}

export { Server }