import React, { ReactElement, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import styles from "./AddFriend.module.scss"

const AddFriend: React.FC = (): ReactElement => {
    const [user_name, set_user_name] = useState("")

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        set_user_name(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault()
        console.log("adding user -> username: ", user_name)
    }

    return (
        <div className={styles.addFriend}>
            <div>
                <div>ADD FRIEND</div>
                <div>You can add a friend with their Discord Tag. It's cAsE sEnSitIvE!</div>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder={"Enter a Username#0000"}
                        value={user_name}
                        onChange={handleChange}
                    />
                    <button type="submit">Send Friend Request</button>
                </form>
            </div>
        </div>
    )
}

export {
    AddFriend
}