const default_state = {
	selected_channel_messages: [],
	selected_user_messages: []
}

function ChatReducer(state = default_state, action) {
	const { type, payload } = action

	switch (type) {
	case "POPULATE_CHANNEL_MESSAGES": {
		const messages = []
		payload.messages.forEach(msg => {
			messages.push(msg)
		})
		console.log("POP CH MESSAGES > PAYLOAD: ", payload)
		return { ...state, selected_channel_messages: messages }
	}
	case "POPULATE_USER_MESSAGES": {
		const messages = []
		payload.messages.forEach(msg => {
			messages.push(msg)
		})
		console.log("POP USER MESSAGES > PAYLOAD: ", payload)
		return { ...state, selected_user_messages: messages }
	}
	case "USER_LOGOUT":
		return default_state
	default:
		return state
	}
}

export default ChatReducer