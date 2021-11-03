import Barebones_Socket from "../../websocket"
import { userService } from "../../Services/userService"
import { channelService } from "../../Services/channelService"
import config from "../../config"

let socket = null
const opts = {
	url: config().WSS_1,
	ping_timeout: 30000,
	pong_timeout: 30000,
	reconnect_timeout: 30000
}

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

			/**
             * @NOTE Needs to have handlers for message types for modularity/scalability.
             *       Fine for dev since I'm TheMachineHerald.
             */
			socket.onmessage = message => {
				const payload = JSON.parse(message.data)
				const state = getState()

				if (payload.event === "CONNECTED_USER") {
					console.log("[BAREBONES]: CONNECTED_USER message response from Nebuchadnezzar")

					return channelService
						.getChannelUsers(state.dashboard.selected_server.selected_channel_id)
						.then(users => {
							dispatch({
								type: "POPULATE_CHANNEL_USERS",
								payload: users
							})
						})
						.catch(err => console.log(err)) 
				}

				if (payload.event === "UDPATE_SELECTED_CHANNEL") {
					console.log("[BAREBONES][UPDATE_SELECTED_CHANNEL][200]")
				}

				if (payload.event === "UPDATE_CHANNEL_MESSAGES") {
					console.log("[BAREBONES]: UPDATE_CHANNEL_MESSAGES response from Nebuchadnezzar")
					return userService
						.getChannelMessages(state.dashboard.selected_server.selected_channel_id)
						.then(messages => {
							dispatch({
								type: "POPULATE_CHANNEL_MESSAGES",
								payload: messages
							})
						})
						.catch(err => console.log("get channel messages err: ", err))
				}

				if (payload.event === "USER_LOGOUT") {
					console.log("[BAREBONES]: USER_LOGOUT response from Nebuchadnezzar")
					return channelService
						.getChannelUsers(state.dashboard.selected_server.selected_channel_id)
						.then(users => {
							dispatch({
								type: "POPULATE_CHANNEL_USERS",
								payload: users
							})
						})
						.catch(err => console.log(err)) 
				}

				if (payload.event === "CLOSE") {
					console.log("[BAREBONES] > close")
					socket.close()
				}
        
				if (payload.event === "PONG") { console.log("[BAREBONES]: Pong from Nebuchadnezzar") }
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