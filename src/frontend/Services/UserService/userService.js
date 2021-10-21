import { authHeader } from './AuthHeader'

export const userService = {
    login,
    logout,
    register,
    getAllUserFriends
}

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    }

    return fetch(`http://localhost:3001/api/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log("successful login > user: ", user)
            if (user) {
                user.authdata = window.btoa(email + ':' + password)
                localStorage.setItem('chat_user', JSON.stringify(user))
            }
            return user
        })
}

function register(register_obj) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(register_obj)
    }

    return fetch(`http://localhost:3001/api/register`, requestOptions)
        .then(handleRegisterResponse)
        .then(user => {
            console.log("successful register > user: ", user)

            user.authdata = window.btoa(user.email + ':' + user.passwrd)
            localStorage.setItem('chat_user', JSON.stringify(user))
            return user
        })
}

function logout() {
    localStorage.removeItem('chat_user')
}

function getAllUserFriends() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`http://localhost:3001/api/user/friends`, requestOptions)
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        console.log("data in handleResponse: ", data)
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

function handleRegisterResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        console.log("data in handleResponse: ", data)
        if (response.status != 200) {
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }

        return data
    })
}