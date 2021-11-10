const default_state = {
	friends: []
}

function UserFriendsReducer(state = default_state, action) {
	const { type, payload } = action

	switch (type) {
	case "POPULATE_USER_FRIENDS": {
		const friends = []
		payload.friends.forEach(f => {
			friends.push(f)
		})
		return { ...state, friends: friends }
	}
	case "USER_LOGOUT":
		return default_state
	default:
		return state
	}
}

export default UserFriendsReducer