import React, { ReactElement, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userService } from "../../../../../../Services/userService"
import { MehOutlined, SmileOutlined } from "@ant-design/icons"
import styles from "./Home.module.scss"

const Home: React.FC = (): ReactElement => {
	const user = useSelector((state: { user: USER_STATE }) => state.user)
	const [hovered, set_hovered] = useState(false)
	const dispatch = useDispatch()

	const handleClick = (): Promise<void> => {
		dispatch({ type: "SAVE_PAGE_SELECTION", payload: "FRIENDS_HOME" })
		return userService
				.saveSelectedHome(user.id)
				.then((resolve: void): void => {
					dispatch({ type: "SAVE_HOME_SELECTED" })
				})
				.catch((err: _Error): void => {
					console.log(err)
					dispatch({ type: "SAVE_HOME_SELECTED" })
				})
	}

	return (
		<div
			className={user.home_selected ? styles.selected : styles.home}
			onMouseEnter={() => set_hovered(true)}
			onMouseLeave={() => set_hovered(false)}
			onClick={() => handleClick()}
		>
			{
				(hovered || user.home_selected)
				? <SmileOutlined className={styles.antIcons} />
				: <MehOutlined className={styles.antIcons} /> 
			}
		</div>
	)
}

export { Home }