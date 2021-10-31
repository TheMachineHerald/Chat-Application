import React, { useEffect } from "react"
import styles from "./UserList.module.scss"

function UserList() {
	useEffect(() => {
		console.log("rendered > UserList")
	}, [])

	return (
		<div className={styles.userList}>
			<h1>SPIKE</h1>
			<h1>SPIKE</h1>
			<h1>SPIKE</h1>
			<h1>SPIKE</h1>
		</div>
	)
}

export default UserList