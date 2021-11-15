import React, { ReactElement, useEffect, useLayoutEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { userService } from "../../../../../../Services/userService"
import { channelService } from "../../../../../../Services/channelService"
import Message from "./components/Message"
import styles from "./RenderChat.module.scss"

const RenderChat: React.FC = (): ReactElement => {
    const user = useSelector((state: { user: USER_STATE }) => state.user)
    const dashboard = useSelector((state: { dashboard: DASHBOARD_STATE }) => state.dashboard)
    const selected_channel_messages = useSelector((state: { chat: CHAT_STATE }) => state.chat.selected_channel_messages)
    const selected_user_messages = useSelector((state: { chat: CHAT_STATE }) => state.chat.selected_user_messages)
    const chat = useSelector((state: { chat: CHAT_STATE }) => state.chat)
    const dispatch = useDispatch()
   
	const get_user_msgs = (): Promise<void> => {
		const ctx: GET_USER_MESSAGES_REQUEST = {
			user_id: user.id,
			friend_id: user.selected_friend_id
		}

		return userService
				.getUserMessages(ctx)
				.then((resolve: Array<CHANNEL_MESSAGES>): void => {
					dispatch({
						type: "POPULATE_USER_MESSAGES",
						payload: resolve
					})
				})
				.catch((err: _Error): void => console.log(err))
	}

	const get_channel_msgs = (): Promise<void> => {
		return channelService
				.getChannelMessages(dashboard.selected_server.selected_channel_id)
				.then((resolve: Array<CHANNEL_MESSAGES>): void => {
                    dispatch({
						type: "POPULATE_CHANNEL_MESSAGES",
						payload: resolve
					})
				})
				.catch((err: _Error): void => console.log(err))
	}

    const RenderMatch = () => {
        console.log("page sel: ", user.page_selection)
        switch(user.page_selection) {
            case "FRIENDS_HOME":
            case "FRIEND":
                if (user.friend_page) {
                    return [].map(msg => {
                        return (
                            <Message
                                key={msg.id}
                                user={msg.user_name}
                                message={msg.message}
                                date={msg.created_date}
                            />
                        )
                    })
                }
                return selected_user_messages.map(msg => {
                    return (
                        <Message
                            key={msg.id}
                            user={msg.user_name}
                            message={msg.message}
                            date={msg.created_date}
                        />
                    )
                })
            case "SERVER":
                    return 	selected_channel_messages.map(msg => {
                        return (
                            <Message
                                key={msg.id}
                                user={msg.user_name}
                                message={msg.message}
                                date={msg.created_date}
                            />
                        )
                    })
            default:
                if (user.home_selected) {
                    return selected_user_messages.map(msg => {
                        return (
                            <Message
                                key={msg.id}
                                user={msg.user_name}
                                message={msg.message}
                                date={msg.created_date}
                            />
                        )
                    })
                }

                return 	selected_channel_messages.map(msg => {
                    return (
                        <Message
                            key={msg.id}
                            user={msg.user_name}
                            message={msg.message}
                            date={msg.created_date}
                        />
                    )
                })
        }
    }

    useLayoutEffect(() => {
		if (user.home_selected) {
			get_user_msgs()
		} else {
			get_channel_msgs()
		}
	}, [dashboard, user.home_selected, user.friend_page, user.selected_friend_id, user.page_selection])

    return (
        <div className={styles.messages}>
            { RenderMatch() }
        </div>
    )
}

export {
    RenderChat
}