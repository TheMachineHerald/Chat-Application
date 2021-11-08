import React, {
	useState,
	useLayoutEffect,
	createContext,
	useRef,
	useEffect,
	ReactElement
} from "react"
import { useSelector, useDispatch } from "react-redux"
import { userService } from "../../../../Services/userService"
import {
	PlusCircleFilled,
	GiftFilled,
	GifOutlined,
	SmileFilled
} from "@ant-design/icons"
import ChatHeader from "./Components/ChatHeader"
import Message from "./Components/Message"
import UserList from "./Components/UserList"
import styles from "./Chat.module.scss"

const ChatContext = createContext(null)

const Chat: React.FC = (): ReactElement => {
	const [message, setMessage] = useState("")
	const [userList, setUserList] = useState(true)
	const user = useSelector((state: { user: USER_STATE }) => state.user)
	const dashboard = useSelector((state: { dashboard: DASHBOARD_STATE }) => state.dashboard)
	const chat = useSelector((state: { chat: CHAT_STATE }) => state.chat)
	const selected_channel_messages = useSelector((state: { chat: CHAT_STATE }) => state.chat.selected_channel_messages)
	const dispatch = useDispatch()
	const msgListRef = useRef(null)

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
				const channel_message = {
					event: "CHANNEL_MESSAGE_SENT",
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
				dispatch({ type: "CHANNEL_MESSAGE_SENT", payload: channel_message })
				setMessage("")
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		if (msgListRef) {
			msgListRef.current.addEventListener("DOMNodeInserted", event => {
				const { currentTarget: target } = event
				target.scroll({ top: target.scrollHeight, behavior: "smooth" })
			})
		}
	}, [dashboard])

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
		<ChatContext.Provider value={{ user_list: [userList, setUserList] }}>
			<div className={styles.chat}>
				<ChatHeader channel_name={dashboard.selected_server.selected_channel_name} />

				<div className={styles.gridContainer}>
					<div className={styles.flexContainer}>
						<div 
							className={styles.messagesWrapper}
							ref={msgListRef}
						>
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
					<UserList />
				</div>
			</div>
		</ChatContext.Provider>
	)
}

export {
	Chat,
	ChatContext
}