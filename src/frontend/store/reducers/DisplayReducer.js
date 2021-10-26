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
            console.log('paylaod: ', payload)
            const _selected_server = Object.assign({}, state.selected_server)    
            _selected_server.selected_channel_id = payload.selected_channel_id
            _selected_server.selected_channel_name = payload.selected_channel_name
            _selected_server.channels.text = payload.text
            _selected_server.channels.voice = payload.voice

            return { ...state, selected_server: _selected_server}
    case 'SAVE_SERVER':
            return { ...state, server: payload }
    case 'SAVE_SERVERS':
            const servers = payload || []
  
            return { ...state, servers: servers }
    case 'SAVE_SERVER_USER':
            return { ...state, server_user: action.payload }
    case 'SAVE_SELECTED_SERVER':
            const selected_server = {
                server_id: payload.server_id || null,
                server_name: payload.server_name || '',
                selected_channel_id: payload.selected_channel_id || null,
                selected_channel_name: payload.selected_channel_name || '',
                channels: payload.channels || state.selected_server.channels
            }

            return { ...state, selected_server: selected_server }
    default:
            return state
  }
}

export default DisplayReducer