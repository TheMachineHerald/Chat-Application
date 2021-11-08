import React, { ReactElement, useState } from "react"
import { MehOutlined, SmileOutlined } from "@ant-design/icons"
import styles from "./Home.module.scss"

const Home: React.FC = (): ReactElement => {
	const [hovered, set_hovered] = useState(false)

	return (
		<div
			className={styles.home}
			onMouseEnter={() => set_hovered(true)}
			onMouseLeave={() => set_hovered(false)}
		>
			{ hovered ? <SmileOutlined className={styles.antIcons} /> : <MehOutlined className={styles.antIcons} /> }
		</div>
	)
}

export { Home }