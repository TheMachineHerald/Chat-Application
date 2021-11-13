import { userService } from "../../../Services/userService"
import { channelService } from "../../../Services/channelService"
import {
	Pong,
	Close,
	Connected_User,
	Update_User_Messages,
	Update_Channel_Messages,
	Update_Selected_Channel,
	User_Logout
} from "./socket_util/events"
import { Handler } from "./socket_util/handler"
import config from "../../../config"
import { StateFromReducersMapObject } from "redux"

let socket = null

const opts: SOCKET_OPTIONS = {
	url: config().WSS_1,
	ping_timeout: 30000,
	pong_timeout: 30000,
	reconnect_timeout: 30000
}

//this will be typed after baseline types are established
const EventHandler = new Handler({
	[Pong.EVENT]: new Pong(),
	[Close.EVENT]: new Close(),
	[Connected_User.EVENT]: new Connected_User(),
	[Update_User_Messages.EVENT]: new Update_User_Messages(),
	[Update_Channel_Messages.EVENT]: new Update_Channel_Messages(),
	[Update_Selected_Channel.EVENT]: new Update_Selected_Channel(),
	[User_Logout.EVENT]: new User_Logout()
})

function socket_middleware({ dispatch, getState }) {
	return next => action => {
		const { type, payload } = action
		switch (type) {
		case "SAVE_SELECTED_CHANNEL": {
			const message: SAVE_SELECTED_CHANNEL_MESSAGE = {
				event: "SAVE_SELECTED_CHANNEL",
				payload: {
					selected_channel_id: payload.selected_channel_id,
					selected_channel_name: payload.selected_channel_name,
					id: payload.user_id
				}
			}
			socket.send(JSON.stringify(message))
			return next(action)
		}
		case "SAVE_HOME_SELECTED": {
			const state = getState()
			const message: SAVE_HOME_SELECTED_MESSAGE = {
				event: "SAVE_HOME_SELECTED",
				payload: {
					home_selected: !state.user.home_selected
				}
			}
			socket.send(JSON.stringify(message))
			return next(action)
		}
		case "UPDATE_SELECTED_SERVER": {
			const message: UPDATE_SELECTED_SERVER_MESSAGE = {
				event: "UPDATE_SELECTED_SERVER",
				payload: {
					selected_server_id: payload.server_id,
					selected_channel_id: payload.selected_channel_id
				}
			}
			socket.send(JSON.stringify(message))
			return next(action)
		}
		case "USER_MESSAGE_SENT": {
			const message: USER_MESSAGE_SENT_MESSAGE = payload
			
			socket.send(JSON.stringify(message))
			return next(action)
		}
		case "CHANNEL_MESSAGE_SENT": {
			const message: CHANNEL_MESSAGE_SENT_MESSAGE = payload
            
			socket.send(JSON.stringify(message))
			return next(action)
		}
		case "POPULATE_FRIEND_LIST": {
			const message: POPULATE_USER_FRIENDS_MESSAGE = {
				event: "POPULATE_FRIEND_LIST",
				payload: payload
			}

			socket.send(JSON.stringify(message))
			return next(action)
		}
		case "USER_LOGOUT":
			socket.close(1000, "USER_LOGOUT")
			return next(action)
		case "PAGE_LOAD": {
			const state = getState()
			const client: CLIENT_USER_PAYLOAD = {
				id: state.user.id,
				user_name: state.user.user_name,
				first_name: state.user.first_name,
				last_name: state.user.last_name,
				email: state.user.email,
				status: state.user.status,
				home_selected: state.user.home_selected,
				selected_friend_id: state.user.selected_friend_id,
				selected_friend_user_name: state.user.selected_friend_user_name,
				selected_server_id: state.user.selected_server_id,
				selected_channel_id: state.user.selected_channel_id,
				servers: state.dashboard.servers
			}

			socket = new WebSocket(`${opts.url}/?client=${client.user_name}-${client.id}`)

			socket.onopen = (): void => {
				console.log("[RED-PILL][OPEN]: ", client)
				const message: CLIENT_SOCKET_OPEN_MESSAGE = {
					event: "CLIENT_SOCKET_OPEN",
					payload: client
				}
				socket.send(JSON.stringify(message))
			}
			
			socket.onclose = (event): void => {
				console.log("[WEBSOCKET][CLOSE EVENT]: ", event)
				socket = new WebSocket(`${opts.url}/?client=${client.user_name}-${client.id}`)
			}
        
			socket.onerror = (): void => {
				console.log("[WEBSOCKET] > error")
			}
			
			socket.onmessage = (message: MessageEvent): void => {
				const payload = JSON.parse(message.data)
				const state: StateFromReducersMapObject<any> = getState()

				EventHandler.handle({
					...payload,
					state: state,
					socket: socket,
					dispatch: dispatch,
					userService: userService,
					channelService: channelService
				})
			}
			
			return next(action)
		}
		default:
			return next(action)
		}
	}
}

export default socket_middleware