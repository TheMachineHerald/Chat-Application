import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Left, Right } from "./components"
import { userService } from "../../../../../../../../Services/userService"
import styles from "./SettingsModal.module.scss"

function SettingsModal(props) {
	const user = useSelector(state => state.user)
	useEffect(() => {
		console.log("Rendered > SettingsModal")
	}, [])
    
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