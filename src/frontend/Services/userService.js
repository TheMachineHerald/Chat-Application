import { authHeader } from "./AuthHeader"
import {
	handleResponse,
	handleLoginResponse
} from "./util"
// API_URL-- just for dev
const API_LINK = "http://localhost:3001"

export const userService = {
	login,
	logout,
	clearCache,
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
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password })
	}

	return fetch(`${API_LINK}/api/login`, requestOptions)
		.then(handleLoginResponse)
		.then(response => {
			if (response === -1) return logout()
			if (response.payload.user) {
				response.payload.user.authdata = window.btoa(email + ":" + password)
				localStorage.setItem("chat_user", JSON.stringify(response.payload.user))
			}
			return response
		})
}

function register(register_obj) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(register_obj)
	}

	return fetch(`${API_LINK}/api/register`, requestOptions)
		.then(handleResponse)
		.then(user => {
			user.authdata = window.btoa(user.email + ":" + user.passwrd)
			localStorage.setItem("chat_user", JSON.stringify(user))
			return user
		})
}

function logout(user_id) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(user_id)
	}

	return fetch(`${API_LINK}/api/logout`, requestOptions)
		.then(handleResponse)
		.then(resolve => {
			localStorage.removeItem("chat_user")
			localStorage.clear()
		})
		.catch(err => {
			localStorage.removeItem("chat_user")
			localStorage.clear()
		})
}

function clearCache() {
	localStorage.removeItem("chat_user")
	localStorage.clear()
}

function getAllChannels(user_id) {
	const requestOptions = {
		method: "GET",
		headers: authHeader()
	}

	return fetch(`${API_LINK}/api/channels/${user_id}`, requestOptions)
		.then(handleResponse)
		.then(channels => {
			return channels
		})
}

function getChannelMessages(channel_id) {
	const requestOptions = {
		method: "GET",
		headers: authHeader()
	}

	return fetch(`${API_LINK}/api/channels/messages/${channel_id}`, requestOptions)
		.then(handleResponse)
		.then(messages => {
			return messages
		})
}

function getAllUserFriends() {
	const requestOptions = {
		method: "GET",
		headers: authHeader()
	}

	return fetch(`${API_LINK}/api/friends`, requestOptions)
		.then(handleResponse)
		.then(friends => {
			return friends
		})
}

function saveSelectedChannel(ctx) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(ctx)
	}

	return fetch(`${API_LINK}/api/channels/save-selected-channel`, requestOptions)
		.then(handleResponse)
		.then(response => {
			return response
		})
}

function saveSelectedServer(ctx) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(ctx)
	}

	return fetch(`${API_LINK}/api/servers/save-selected-server`, requestOptions)
		.then(handleResponse)
		.then(response => {
			return response
		})
}

function saveMessage(ctx) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(ctx)
	}

	return fetch(`${API_LINK}/api/channels/save-message`, requestOptions)
		.then(handleResponse)
		.then(response => {
			return response
		})
}