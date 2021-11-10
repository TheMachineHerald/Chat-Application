const default_state = {
	id: null,
	logged_in: false,
	user_name: "",
	first_name: "",
	last_name: "",
	email: "",
	status: "",
	home_selected: false,
	selected_friend_id: null,
	selected_friend_user_name: "",
	selected_server_id: null,
	selected_channel_id: null,
	selected_server_name: "",
	session_token: ""
}

function UserReducer(state = default_state, action) {
	const { type, payload } = action

	switch (type) {
	case "SAVE_USER": {
		const user = {
			id: payload.id,
			logged_in: true,
			user_name: payload.user_name,
			first_name: payload.first_name,
			last_name: payload.last_name,
			email: payload.email,
			status: payload.status,
			home_selected: payload.home_selected ? true : false,
			selected_friend_id: payload.selected_friend_id,
            selected_friend_user_name: payload.selected_friend_user_name,
			selected_server_id: payload.selected_server_id,
			selected_channel_id: payload.selected_channel_id,
			selected_server_name: payload.selected_server_name,
			session_token: ""
		}

		return user
	}
	case "SAVE_HOME_SELECTED":
		return { ...state, home_selected: !state.home_selected }
	case "SAVE_SELECTED_FRIEND": {
		const selected_friend = {
			selected_friend_id: payload.selected_friend_id,
			selected_friend_user_name: payload.selected_friend_user_name
		}
		return { ...state, selected_friend }
	}
	case "USER_LOGIN":
		return { ...state, logged_in: action.payload }
	case "USER_LOGOUT":
		return default_state
	default:
		return state
	}
}

export default UserReducer