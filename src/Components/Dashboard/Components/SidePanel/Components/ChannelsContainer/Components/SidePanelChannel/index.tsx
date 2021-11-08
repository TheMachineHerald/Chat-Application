import React, { ReactElement } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userService } from "../../../../../../../../Services/userService"
import { NumberOutlined, SoundFilled } from "@ant-design/icons"
import styles from "./SidePanelChannel.module.scss"

const SidePanelChannel: React.FC<SIDE_PANEL_CHANNEL_PROPS> = (props): ReactElement => {
	const server_id = useSelector((state: { dashboard: DASHBOARD_STATE }) => state.dashboard.selected_server.server_id)
	const dispatch = useDispatch()

	const handleClick = (id: number): Promise<void> => {
		const ctx: SIDE_PANEL_REQUEST = {
			selected_server_id: server_id,
			channel_id: id,
			user_id: props.user_id
		}

		return userService
				.saveSelectedChannel(ctx)
				.then((resolve: _SAVE_SELECTED_CHANNEL_PAYLOAD): void => {
					dispatch({
						type: "SAVE_SELECTED_CHANNEL",
						payload: resolve.channels
					})
				})
				.catch((err) => console.log(err))
	}

	const return_type: React.FC<string> = (type): ReactElement => {
		return type === "TEXT" ? <NumberOutlined className={styles.hash} /> : <SoundFilled className={styles.hash} />
	}

	return (
		<div
			onClick={() => handleClick(props.id)}
			className={styles.channel}
		>
			<h4 className={ props.is_selected ? styles.active : styles.inactive }>
				{return_type(props.type)}
				{props.channel}
			</h4>
		</div>
	)
}

export default SidePanelChannel