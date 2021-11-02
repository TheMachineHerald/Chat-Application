import Barebones_Socket from "../../websocket"
import { userService } from "../../Services/userService"

let socket = null

const LOCAL_HOST = "ws://localhost:9000"

const opts = {
	url: LOCAL_HOST,
	ping_timeout: 30000,
	pong_timeout: 30000,
	reconnect_timeout: 30000
}

function socket_middleware({ dispatch, getState }) {
	return next => action => {
		switch (action.type) {
		case "SAVE_USER": {
			console.log("SAVE_USER > This is where the socket should be created: ", action.payload)
			const client = {
				id: action.payload.id,
				user_name: action.payload.user_name
			}

			socket = new Barebones_Socket(opts, client)

			socket.onopen = () => {
				console.log("[SOCKET MIDDLEWARE] > open")
			}

			socket.close = (code, reason) => {
				console.log(`[SOCKET MIDDLEWARE] [${code}] [${reason}]`)
			}

			socket.onreconnect = () => {
				console.log("[SOCKET MIDDLEWARE] > reconnect")
			}
        
			socket.onerror = () => {
				console.log("[SOCKET MIDDLEWARE] > error")
			}

			socket.onmessage = message => {
				const payload = JSON.parse(message.data)
				const state = getState()

				if (payload.event == "update_channel_msgs") {
					console.log("[SOCKET MIDDLEWARE]: update channel message response from Nebuchadnezzar")
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

				if (payload.event == "close") {
					console.log("[SOCKET MIDDLEWARE] > close")
					socket.close()
				}
        
				if (payload.event == "pong") { console.log("[SOCKET MIDDLEWARE]: Pong from Nebuchadnezzar") }
			}

			return next(action)
		}
		case "USER_LOGOUT":
			console.log("[SOCKET MIDDLEWARE][USER_LOGOUT] closing socket...")
			socket.close(1000, "USER_LOGOUT")
			return next(action)
		case "CHANNEL_MSG_SENT": {
			console.log("[SOCKET MIDDLEWARE][CHANNEL MSG SENT]")
			const message = action.payload
			socket.send(JSON.stringify(message))
			return next(action)
		}
		default:
			return next(action)
		}
	}
}

export default socket_middleware