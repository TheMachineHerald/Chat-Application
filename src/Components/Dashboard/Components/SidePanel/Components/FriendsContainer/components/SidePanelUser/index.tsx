import React, { ReactElement } from "react"
import { useDispatch } from "react-redux"
import { userService } from "../../../../../../../../Services/userService"
import styles from "./SidePanelUser.module.scss"

const SidePanelUser: React.FC<SIDE_PANEL_USER_PROPS> = (props): ReactElement => {
	const dispatch = useDispatch()

	const handleClick = (props): Promise<void> => {
		const ctx: SIDE_PANEL_USER_REQUEST = {
			user_id: props.user_id,
			friend_id: props.friend_id,
			friend_user_name: props.friend_user_name
		}

		return userService
				.saveSelectedUser(ctx)
				.then((resolve: SIDE_PANEL_USER_MESSAGE): void => {
					dispatch({
						type: "SAVE_SELECTED_FRIEND",
						payload: {
							selected_friend_id: ctx.friend_id,
							selected_friend_user_name: ctx.friend_user_name
						}
					})
				})
				.catch((err: _Error) => console.log(err))
	}

	return (
		<div
			onClick={() => handleClick(props)}
			className={styles.sidePanelUser}
		>
			<h4 className={ props.is_selected ? styles.active : styles.inactive }>
				{props.friend_user_name}{props.is_selected}
			</h4>
		</div>
	)
}

export { SidePanelUser }