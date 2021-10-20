export const save_user = identity => ({
  type: 'SAVE_USER',
  identity
})

export const save_token = token => ({
  type: 'SAVE_TOKEN',
  token
})

export const save_socket = socket => ({
  type: 'SAVE_SOCKET',
  socket
})

export const save_device = device => ({
  type: 'SAVE_DEVICE',
  device
})