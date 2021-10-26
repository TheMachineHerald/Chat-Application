import _ from 'lodash'

const default_state = {
    selected_server: {
        server_id: null,
        server_name: '',
        selected_channel_id: null,
        selected_channel_name: '',
        channels: {
          text: [],
          voice: []
        }
    },
    servers: []
}

function DisplayReducer(state = default_state, action) {
  const { type, payload } = action

  switch(type) {
    case 'SAVE_SELECTED_CHANNEL':
            const selected__server = Object.assign({}, state.selected_server)    
            
            selected__server.selected_channel_id = payload.selected_channel_id
            selected__server.selected_channel_name = payload.selected_channel_name
            selected__server.channels.text = payload.text
            selected__server.channels.voice = payload.voice

            return { ...state, selected_server: selected__server}
    case 'SAVE_SERVER':
            return { ...state, server: payload }
    case 'SAVE_SERVERS':
            const servers = payload || []
  
            return { ...state, servers: servers }
    case 'SAVE_SERVER_USER':
            return { ...state, server_user: action.payload }
    case 'SAVE_SELECTED_SERVER':
            const selected_server = {
              server_id: payload.server_id,
              server_name: payload.server_name,
              selected_channel_id: payload.selected_channel_id,
              selected_channel_name: payload.selected_channel_name,
              channels: payload.channels
            }

            return { ...state, selected_server: selected_server }
    default:
            return state
  }
}

export default DisplayReducer