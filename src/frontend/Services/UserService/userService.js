import { authHeader } from './AuthHeader'

export const userService = {
    login,
    logout,
    register,
    getAllUserFriends,
    getAllChannels,
    getChannelMessages,
    saveSelectedChannel,
    saveSelectedServer,
    saveMessage
}

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    }

    return fetch(`http://localhost:3001/api/login`, requestOptions)
            .then(handleLoginResponse)
            .then(response => {
                if (response.payload.user) {
                    response.payload.user.authdata = window.btoa(email + ':' + password)
                    localStorage.setItem('chat_user', JSON.stringify(response.payload.user))
                }
                return response
            })
}

function register(register_obj) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(register_obj)
    }

    return fetch(`http://localhost:3001/api/register`, requestOptions)
            .then(handleResponse)
            .then(user => {
                user.authdata = window.btoa(user.email + ':' + user.passwrd)
                localStorage.setItem('chat_user', JSON.stringify(user))
                return user
            })
}


//this will be querying database, so it needs to be asynchronous
//for dev just remove token
function logout() {
    return new Promise((resolve, reject) => {
        localStorage.removeItem('chat_user')
        resolve()
    })
}

function getAllChannels(user_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`http://localhost:3001/api/channels/${user_id}`, requestOptions)
            .then(handleResponse)
            .then(channels => {
                return channels
            })
}

function getChannelMessages(channel_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`http://localhost:3001/api/channels/messages/${channel_id}`, requestOptions)
            .then(handleResponse)
            .then(messages => {
                return messages
            })
}

function getAllUserFriends() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`http://localhost:3001/api/friends`, requestOptions)
            .then(handleResponse)
            .then(friends => {
                return friends
            })
}

function saveSelectedChannel(ctx) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ctx)
    }

    return fetch(`http://localhost:3001/api/channels/save-selected-channel`, requestOptions)
            .then(handleResponse)
            .then(response => {
                return response
            })
}

function saveSelectedServer(ctx) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ctx)
    }

    return fetch(`http://localhost:3001/api/servers/save-selected-server`, requestOptions)
            .then(handleResponse)
            .then(response => {
                return response
            })
}

function saveMessage(ctx) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ctx)
    }

    return fetch(`http://localhost:3001/api/channels/save-message`, requestOptions)
            .then(handleResponse)
            .then(response => {
                return response
            })
}

function handleLoginResponse(response) {
    return response
            .text()
            .then(text => {
                const data = text && JSON.parse(text)
                if (response.status != 200) {
                    // auto logout if 401 response returned from api
                    logout()
                    location.reload(true)
                    return
                    // const error = (data && data.message) || response.statusText
                    // return Promise.reject(error)
                }
                return data
            })
}

function handleResponse(response) {
    return response
            .text()
            .then(text => {
                const data = text && JSON.parse(text)
                if (response.status != 200) {
                    const error = (data && data.message) || response.statusText
                    return Promise.reject(error)
                }
                return data
            })
}