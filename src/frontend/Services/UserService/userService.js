import { authHeader } from './AuthHeader'

export const userService = {
    login,
    logout,
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
                // user.authdata = window.btoa(email + ':' + password)
                localStorage.setItem('chat_user', JSON.stringify(user))
            }
            return user
        })
        .catch(err => console.log(err))
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
          if (response.status != 200) {
            // auto logout if 401 response returned from api
            logout()
            // eslint-disable-next-line no-restricted-globals
            location.reload(true)
            return
            // const error = (data && data.message) || response.statusText
            // return Promise.reject(error)
          }

        return data
    })
}