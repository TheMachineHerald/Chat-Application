import React, {
    useState,
    useEffect,
    createContext,
    ReactElement
} from "react"
import { useSelector, useDispatch } from "react-redux"
import {
	RobotFilled
} from "@ant-design/icons"
import styles from "./FriendsButton.module.scss"

const FriendsButton: React.FC = (): ReactElement => {
    const [friendsHome, setFriendsHome] = useState(false)
    const user = useSelector((state: { user: USER_STATE }) => state.user)
    const dispatch = useDispatch()

    const handleClick = (): void => {        
        dispatch({ type: "SAVE_HOME_PAGE", payload: true })
        dispatch({ type: "SAVE_PAGE_SELECTION", payload: "HOME_PAGE" })
    }

    useEffect(() => {}, [user])

    return (
        <div
            onClick={() => handleClick()}
            className={styles.friendsButton}
        >
            <h4 className={ user.home_page ? styles.active: styles.inactive }>
                <RobotFilled className={styles.robot}/>
                <span>Friends</span>
            </h4>
        </div>
    )
}

export {
    FriendsButton
}