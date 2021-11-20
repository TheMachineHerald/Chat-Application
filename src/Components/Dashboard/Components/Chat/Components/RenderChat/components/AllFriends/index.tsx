import React, { ReactElement } from "react"
import styles from "./AllFriends.module.scss"

const AllFriends: React.FC = (): ReactElement => {
    return (
        <div className={styles.allFriends}>
            HOWDY ITS THE ALL FRIENDS PAGE
        </div>
    )
}

export {
    AllFriends
}