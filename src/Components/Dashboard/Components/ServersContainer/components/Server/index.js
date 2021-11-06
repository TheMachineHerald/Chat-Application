import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userService } from "../../../../../../Services/userService"
import { FolderFilled, FolderOpenFilled } from "@ant-design/icons"
import styles from "./Server.module.scss"

function Server(props) {
	const [hovered, set_hovered] = useState(false)
	const dispatch = useDispatch()
	const selected_server = useSelector(state => state.dashboard.selected_server)
	const selected_server_id = useSelector(state => state.dashboard.selected_server.server_id)

	const handleClick = (u_id, s_id, s_name) => {
		const ctx = {
			user_id: u_id,
			server_id: s_id,
			server_name: s_name
		}

		return userService
			.saveSelectedServer(ctx)
			.then(resolve => {
				dispatch({
					type: "UPDATE_SELECTED_SERVER",
					payload: resolve
				})
			})
			.catch(err => console.log(err))
	}

	return (
		<div
			onClick={() => handleClick(props.user_id, props.id, props.name)}
			onMouseEnter={() => set_hovered(true)}
			onMouseLeave={() => set_hovered(false)}
			className={selected_server_id == props.id ? styles.selected : styles.server}
		>
			{
				hovered || (selected_server_id == props.id)
					? <FolderOpenFilled className={styles.antIcons}/>
					: <FolderFilled className={styles.antIcons}/>
			}
		</div>
	)
}

export default Server