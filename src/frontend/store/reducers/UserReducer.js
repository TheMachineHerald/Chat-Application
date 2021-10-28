const default_state = {
    id: null,
    logged_in: false,
    user_name: '',
    first_name: '',
    last_name: '',
    email: '',
    status: '',
    selected_server_id: null,
    selected_server_name: '',
    session_token: ''
}

function UserReducer(state = default_state, action) {
  const { type, payload } = action

  switch(type) {
    case 'SAVE_USER':
            const user = {
                id: payload.id,
                logged_in: true,
                user_name: payload.user_name,
                first_name: payload.first_name,
                last_name: payload.last_name,
                email: payload.email,
                status: payload.status,
                selected_server_id: payload.selected_server_id,
                selected_server_name: payload.selected_server_name,
                session_token: ''
            }

            return user
    case 'USER_LOGIN':
      return { ...state }
            return { ...state, logged_in: action.payload }
    case 'USER_LOGOUT':
            return default_state
    default:
            return state
  }
}

export default UserReducer