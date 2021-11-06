import Barebones_Socket from "../../websocket"
import { userService } from "../../Services/userService"
import { channelService } from "../../Services/channelService"
import {
	Pong,
	Close,
	Connected_User,
	Update_Channel_Messages,
	Update_Selected_Channel,
	User_Logout
} from "../middleware/socket_util/events"
import { Handler } from "../middleware/socket_util/handler"
import config from "../../config"

let socket = null
const opts = {
	url: config().WSS_1,
	ping_timeout: 30000,
	pong_timeout: 30000,
	reconnect_timeout: 30000
}

const EventHandler = new Handler({
	[Pong.EVENT]: new Pong(),
	[Close.EVENT]: new Close(),
	[Connected_User.EVENT]: new Connected_User(),
	[Update_Channel_Messages.EVENT]: new Update_Channel_Messages(),
	[Update_Selected_Channel.EVENT]: new Update_Selected_Channel(),
	[User_Logout.EVENT]: new User_Logout()
})

function socket_middleware({ dispatch, getState }) {
	return next => action => {
		const { type, payload } = action
		switch (type) {
		case "SAVE_USER": {
			const client = {
				id: payload.id,
				user_name: payload.user_name,
				first_name: payload.first_name,
				last_name: payload.last_name,
				email: payload.email,
				status: payload.status,
				selected_server_id: payload.selected_server_id,
				selected_channel_id: payload.selected_channel_id
			}

			socket = new Barebones_Socket(opts, client)

			socket.onopen = () => {
				console.log("[RED-PILL][OPEN]")
				const message = {
					event: "CLIENT_SOCKET_OPEN",
					payload: client
				}
				socket.send(JSON.stringify(message))
			}

			socket.onreconnect = () => {
				console.log("[BAREBONES] > reconnect")
			}
        
			socket.onerror = () => {
				console.log("[BAREBONES] > error")
			}
			
			socket.onmessage = message => {
				const payload = JSON.parse(message.data)
				const state = getState()

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
		case "SAVE_SELECTED_CHANNEL": {
			const message = {
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
		case "UPDATE_SELECTED_SERVER": {
			const message = {
				event: "UPDATE_SELECTED_SERVER",
				payload: {
					selected_server_id: payload.server_id,
					selected_channel_id: payload.selected_channel_id
				}
			}
			socket.send(JSON.stringify(message))
			return next(action)
		}
		case "USER_LOGOUT":
			socket.close(1000, "USER_LOGOUT")
			return next(action)
		case "CHANNEL_MESSAGE_SENT": {
			const message = payload
            
			socket.send(JSON.stringify(message))
			return next(action)
		}
		default:
			return next(action)
		}
	}
}

export default socket_middleware