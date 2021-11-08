import React, { ReactElement, useContext, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router"

import { userService } from "../../../../../../../../../../Services/userService"
import { ProfileContext } from "../../../../index"
import styles from "./Left.module.scss"

const Left: React.FC = (): ReactElement => {
	const user = useSelector((state: { user: USER_STATE }) => state.user)
	const profile = useContext(ProfileContext)
	const [settingsVisible, setSettingsVisible] = profile.settings
	const dispatch = useDispatch()
	const history = useHistory()


	const handleLogout = () => {
		setSettingsVisible(false)

		userService
			.logout(user.id)
			.then(resolve => {
				dispatch({ type: "USER_LOGOUT" })
				history.push({ pathname: "/login" })
			})
			.catch(err => {
				console.log(err)
			})
	}

	useEffect(() => {
		console.log("rendered left >", profile)
	}, [])

	return (
		<div className={styles.left}>
			<div className={styles.container}>
				<div className={styles.settingsTitle}>USER SETTINGS</div>
				<h4 className={styles.setting}>My Account</h4>
				<h4 className={styles.setting}>User Profile</h4>
				<h4
					className={styles.logout}
					onClick={() => handleLogout()}
				>
                    Logout
				</h4>
			</div>

		</div>
	)
}

export {
	Left
}