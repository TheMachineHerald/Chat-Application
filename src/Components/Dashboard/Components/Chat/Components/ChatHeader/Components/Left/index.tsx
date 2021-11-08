import React, { ReactElement } from "react"
import { NumberOutlined } from "@ant-design/icons"
import styles from "./Left.module.scss"

const Left: React.FC<LEFT_COMPONENT_PROPS> = (props): ReactElement => {
	return (
		<div className={styles.left}>
			<h3>
				<NumberOutlined className={styles.hash}/>
				{props.channel}
			</h3>
		</div>
	)
}

export default Left