import _ from 'lodash'

const default_state = {
  user: {
    logged_in: false,
    user_name: '',
    first_name: '',
    last_name: '',
    email: '',
    status: '',
    session_token: ''
  }
}

function DashboardReducer(state = default_state, action) {
  switch(action.type) {
    case 'SAVE_USER':
      return { ...state,  logged_in: action.payload }
    case 'USER_LOGOUT':
      return { ...state, logged_in: action.payload }
    default:
      return state
  }
}

export default DashboardReducer