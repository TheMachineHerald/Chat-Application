import React, { ReactElement } from "react"
import { useSelector } from "react-redux"
import { Avatar } from "antd"
import { CloseCircleOutlined, UserOutlined } from "@ant-design/icons"
import styles from "./Right.module.scss"

const Right: React.FC<SETTINGS_MODAL_RIGHT_COMPONENT_PROPS> = (props): ReactElement => {
	const user = useSelector((state: { user: USER_STATE }) => state.user)
    
	return (
		<div className={styles.right}>
			<div className={styles.container}>
				<div className={styles.userCard}>
					<div className={styles.header}>
						<div className={styles.userHeader}>
							<div>
								<Avatar className={styles.avatar} icon={<UserOutlined />} />
								<div className={styles.userName}>{`${user.user_name}#${user.id}`}</div>
							</div>
							<button>Edit User Profile</button>
						</div>
					</div>
					<div className={styles.content}>
						<div className={styles.infoContainer}>
							<div className={styles.userInfo}>
								<div className={styles.title}>USER_NAME</div>
								<div className={styles.userData}>{user.user_name}</div>
							</div>
							<button>Edit</button>
						</div>
						<div className={styles.infoContainer}>
							<div className={styles.userInfo}>
								<div className={styles.title}>EMAIL</div>
								<div className={styles.userData}>{user.email}</div>
							</div>
							<button>Edit</button>
						</div>
						<div className={styles.infoContainer}>
							<div className={styles.userInfo}>
								<div className={styles.title}>FULL_NAME</div>
								<div className={styles.userData}>{`${user.first_name} ${user.last_name}`}</div>
							</div>
							<button>Edit</button>
						</div>
					</div>
				</div>
				<CloseCircleOutlined
					className={styles.closeButton}
					onClick={props.toggle}
				/>
			</div>
		</div>
	)
}

export {
	Right
}