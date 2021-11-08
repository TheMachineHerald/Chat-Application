import React, { ReactElement, useEffect } from "react"
import { useSelector } from "react-redux"
import { Left, Right } from "./components"
import styles from "./SettingsModal.module.scss"

const SettingsModal: React.FC<SETTINGS_MODAL_PROPS> = (props): ReactElement => {
	const user = useSelector((state: { user: USER_STATE }) => state.user)
    
	return (
		<div className={props.visible ? styles.settingsModal : styles.hide}>
			<Left />
			<Right toggle={props.onCancel} />
		</div>
	)
}

export {
	SettingsModal
}