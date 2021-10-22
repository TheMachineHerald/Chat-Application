import _ from 'lodash'

const default_state = {
  user: {
    id: null,
    logged_in: false,
    user_name: '',
    first_name: '',
    last_name: '',
    email: '',
    status: '',
    selected_channel: {
      channel_id: null,
      channel_name: ''
    },
    session_token: ''
  },
  channels: {
    text: [],
    voice: []
  },
  selected_channel_messages: []
}

function DashboardReducer(state = default_state, action) {
  const { type, payload } = action

  switch(type) {
    case 'SAVE_USER':
      const _user = {
        id: payload.user.id,
        logged_in: true,
        user_name: payload.user.user_name,
        first_name: payload.user.first_name,
        last_name: payload.user.last_name,
        email: payload.user.email,
        status: payload.user.status,
        selected_channel: {
          channel_id: payload.user.selected_channel_id,
          channel_name: payload.user.selected_channel_name
        },
        session_token: state.user.session_token
      }

      return { ...state, user: _user }
    case 'SAVE_CHANNELS':
      const _channels = {
        text: [],
        voice: []
      }

      console.log('SAVE_CHANNELS payload: ', payload)

      payload.channels.forEach(ch => {
        if (ch.type === "TEXT") {
            _channels.text.push({
              channels_id: ch.id,
              name: ch.channel_name
            })
        }

        if (ch.type === "VOICE") {
            _channels.voice.push({
              channels_id: ch.id,
              name: ch.channel_name
            })
        }
      })

      return { ...state, channels: _channels }
    case 'POPULATE_CHANNEL_MESSAGES':
      console.log("POPULATE_CHANNEL_MESSAGES: ", payload)

      const messages = []

      payload.messages.forEach(msg => {
        messages.push(msg)
      })

      return { ...state, selected_channel_messages: messages }
    case 'SAVE_SELECTED_CHANNEL':
      const user_slice = Object.assign({}, state.user)
      user_slice.selected_channel = {
        channel_id: payload.channel_id || null,
        channel_name: payload.channel_name || ''
      }

      return { ...state, user: user_slice }
    case 'USER_LOGIN':
      return { ...state, logged_in: action.payload }
    case 'USER_LOGOUT':
      return { ...state, logged_in: action.payload }
    default:
      return state
  }
}

export default DashboardReducer