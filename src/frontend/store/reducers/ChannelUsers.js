const default_state = {
	channel_users: []
}

function ChannelUsersReducer(state = default_state, action) {
	const { type, payload } = action

	switch (type) {
	case "POPULATE_CHANNEL_USERS": {
		const channel_users = []
		payload.channel_users.forEach(usr => {
			channel_users.push(usr)
		})
		return { ...state, channel_users: channel_users }
	}
	case "USER_LOGOUT":
		return default_state
	default:
		return state
	}
}

export default ChannelUsersReducer