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
import { channelService } from "../../../../Services/channelService"
import {
	PlusCircleFilled,
	GiftFilled,
	GifOutlined,
	SmileFilled
} from "@ant-design/icons"
import ChatHeader from "./Components/ChatHeader"
import Message from "./Components/Message"
import UserList from "./Components/UserList"
import FriendList from "./Components/FriendList"
import styles from "./Chat.module.scss"

const ChatContextDefaultValues: USER_LIST_STATE = {
	userList: false,
	set_user_list: () => {}
}

const ChatContext = createContext<USER_LIST_STATE>(ChatContextDefaultValues)

const Chat: React.FC = (): ReactElement => {
	const [message, setMessage] = useState("")
	const [userList, setUserList] = useState(true)
	const [msgPlaceholder, setMsgPlaceholder] = useState("Message")
	const user = useSelector((state: { user: USER_STATE }) => state.user)
	const dashboard = useSelector((state: { dashboard: DASHBOARD_STATE }) => state.dashboard)
	const chat = useSelector((state: { chat: CHAT_STATE }) => state.chat)
	const selected_channel_messages = useSelector((state: { chat: CHAT_STATE }) => state.chat.selected_channel_messages)
	const selected_user_messages = useSelector((state: { chat: CHAT_STATE }) => state.chat.selected_user_messages)
	const dispatch = useDispatch()
	const msgListRef = useRef(null)

	const set_user_list = (T: boolean) => setUserList(T)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setMessage(event.target.value)
	}

	const handleSubmit = (event: React.FormEvent): Promise<void> => {
		event.preventDefault()
		
		if (user.home_selected) {
			const ctx: SAVE_USER_MESSAGE_REQUEST = {
				user_id: user.id,
				user_name: user.user_name,
				friend_id: user.selected_friend_id,
				friend_user_name: user.selected_friend_user_name,
				message: message
			}

			return userService
					.saveMessage(ctx)
					.then((resolve: void): void => {
						const user_message: USER_MESSAGE_EVENT = {
							event: "USER_MESSAGE_SENT",
							payload: {
								user_id: user.id,
								user_name: user.user_name,
								friend_id: user.selected_friend_id,
								friend_user_name: user.selected_friend_user_name,
								message: message
							}
						}
						dispatch({ type: "USER_MESSAGE_SENT", payload: user_message })
						setMessage("")
					})
					.catch((err: _Error): void => console.log(err))
		} else {
			const ctx: SAVE_MESSAGE_REQUEST = {
				channel_id: dashboard.selected_server.selected_channel_id,
				server_id: dashboard.selected_server.server_id,
				user_id: user.id,
				user_name: user.user_name,
				message: message
			}

			return channelService
					.saveMessage(ctx)
					.then((resolve: void): void => {
						const channel_message: CHANNEL_MESSAGE_EVENT = {
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
					.catch((err: _Error): void => console.log(err))
		}
	}

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

	const RenderMainContent: React.FC = (): ReactElement => {
		return (
			<div className={styles.flexContainer}>
				
			</div>
		)
	}

	useEffect(() => {
		if (msgListRef) {
			try {
				msgListRef.current.addEventListener("DOMNodeInserted", (event) => {
					const { currentTarget: target } = event
					target.scroll({ top: target.scrollHeight, behavior: "smooth" })
				})
			} catch (e) {
				console.log(e)
			}
		}
	}, [dashboard])

	useLayoutEffect(() => {
		if (user.home_selected) {
			setMsgPlaceholder(`@${user.selected_friend_user_name}`)
			get_user_msgs()
		} else {
			setMsgPlaceholder(`#${dashboard.selected_server.selected_channel_name}`)
			get_channel_msgs()
		}
	}, [dashboard, user.home_selected, user.friend_page])

	return (
		<ChatContext.Provider value={{ userList, set_user_list }}>
			<div className={styles.chat}>
				<ChatHeader />
				<div className={styles.gridContainer}>
					<div className={styles.flexContainer}>
						<div 
							className={styles.messagesWrapper}
							ref={msgListRef}
						>
							<div className={styles.messages}>
								{
									user.home_selected
									
									?

									selected_user_messages.map(msg => {
										return (
											<Message
												key={msg.id}
												user={msg.user_name}
												message={msg.message}
												date={msg.created_date}
											/>
										)
									})

									:

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
									placeholder={`Message ${msgPlaceholder}`}
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
					{ user.home_selected ? <FriendList /> : <UserList /> }
				</div>
			</div>
		</ChatContext.Provider>
	)
}

export {
	Chat,
	ChatContext
}