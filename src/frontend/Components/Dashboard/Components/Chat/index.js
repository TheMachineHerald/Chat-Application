import React, { useState, useLayoutEffect, useContext } from "react"
import { useSelector, useDispatch } from "react-redux"
import { DashboardContext } from "../.."
import { userService } from "../../../../Services/UserService/userService"
import {
	PlusCircleFilled,
	GiftFilled,
	GifOutlined,
	SmileFilled
} from "@ant-design/icons"
import ChatHeader from "./Components/ChatHeader"
import Message from "./Components/Message"
import styles from "./Chat.module.scss"

function Chat() {
	const [message, setMessage] = useState("")
	const socket = useContext(DashboardContext)
	const user = useSelector(state => state.user)
	const dashboard = useSelector(state => state.dashboard)
	const selected_channel_messages = useSelector(state => state.chat.selected_channel_messages)
	const dispatch = useDispatch()

	const handleChange = event => {
		setMessage(event.target.value)
	}

	const handleSubmit = event => {
		event.preventDefault()
		const ctx = {
			channel_id: dashboard.selected_server.selected_channel_id,
			server_id: dashboard.selected_server.server_id,
			user_id: user.id,
			user_name: user.user_name,
			message: message
		}

		return userService
			.saveMessage(ctx)
			.then(resolve => {
				const message = {
					event: "channel_msg_sent",
					payload: {
						user: {
							id: user.id,
							user_name: user.user_name,
							message: message
						},
						channel_id: ctx.channel_id,
						server_id: ctx.server_id
					}
				}
				socket.send(JSON.stringify(message))
				setMessage("")
			})
			.catch(err => console.log(err))
	}

	socket.onmessage = server_payload => {
		try {
			const payload = JSON.parse(server_payload.data)

			if (payload.event == "update_channel_msgs") {
				console.log("[BareBones]: update channel message response from Nebuchadnezzar")

				return userService
					.getChannelMessages(dashboard.selected_server.selected_channel_id)
					.then(messages => {
						dispatch({
							type: "POPULATE_CHANNEL_MESSAGES",
							payload: messages
						})
					})
					.catch(err => console.log("get channel messages err: ", err))
			}
		} catch (e) {
			console.log("update_channel_msg error: ", e)
		}
	}

	useLayoutEffect(() => {
		userService
			.getChannelMessages(dashboard.selected_server.selected_channel_id)
			.then(messages => {
				dispatch({
					type: "POPULATE_CHANNEL_MESSAGES",
					payload: messages
				})
			})
			.catch(err => console.log(err))
	}, [dashboard])

	return (
		<div className={styles.chat}>
			<ChatHeader channel_name={dashboard.selected_server.selected_channel_name} />

			<div className={styles.messagesWrapper}>
				<div className={styles.messages}>
					{
						selected_channel_messages.map(msg => {
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
				</div>
			</div>

			<div className={styles.input}>
				<PlusCircleFilled className={styles.antIcons} />
				<form onSubmit={handleSubmit}>
					<input
						placeholder={`Message #${dashboard.selected_server.selected_channel_name}`}
						value={message}
						onChange={handleChange}
					/>
					<button type="submit">
              Send Message
					</button>
				</form>
				<div className={styles.icons}>
					<GiftFilled className={styles.antIcons}/>
					<GifOutlined className={styles.antIcons}/>
					<SmileFilled className={styles.antIcons}/>
				</div>
			</div>
		</div>
	)
}

export default Chat