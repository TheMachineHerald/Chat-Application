import _ from "lodash"

const default_state = {
	selected_server: {
		server_id: null,
		server_name: "",
		selected_channel_id: null,
		selected_channel_name: "",
		channels: {
			text: [],
			voice: []
		}
	},
	servers: []
}

function DashboardReducer(state = default_state, action) {
	const { type, payload } = action

	switch (type) {
	case "SAVE_SELECTED_CHANNEL": {
		const _state = Object.assign({}, state)

		_state.selected_server.selected_channel_id = payload.selected_channel_id
		_state.selected_server.selected_channel_name = payload.selected_channel_name
		_state.selected_server.channels.text = payload.text
		_state.selected_server.channels.voice = payload.voice

		return _state
	}
	case "SAVE_SERVER":
		return { ...state, server: payload }
	case "SAVE_SERVERS": {
		const servers = payload || []

		return { ...state, servers: servers }
	}
	case "SAVE_SERVER_USER":
		return { ...state, server_user: action.payload }
	case "SAVE_SELECTED_SERVER": {
		const selected_server = {
			server_id: payload.server_id,
			server_name: payload.server_name,
			selected_channel_id: payload.selected_channel_id,
			selected_channel_name: payload.selected_channel_name,
			channels: payload.channels
		}

		return { ...state, selected_server: selected_server }
	}
	case "UPDATE_SELECTED_SERVER": {
		const selected_server = {
			server_id: payload.server_id,
			server_name: payload.server_name,
			selected_channel_id: payload.selected_channel_id,
			selected_channel_name: payload.selected_channel_name,
			channels: payload.channels
		}

		return { ...state, selected_server: selected_server }
	}
	case "USER_LOGOUT":
		return default_state
	default:
		return state
	}
}

export default DashboardReducer