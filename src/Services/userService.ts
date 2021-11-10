import { authHeader } from "./AuthHeader"
import config from "../config"
import {
	handleResponse,
	handleLoginResponse
} from "./util"

const API_LINK = config().API_URL

export const userService = {
	login,
	logout,
	clearCache,
	register,
	getAllUserFriends,
	getAllChannels,
	getChannelMessages,
	saveSelectedHome,
	saveSelectedChannel,
	saveSelectedServer,
	saveMessage
}

/**
 * 
 * @NOTE Auth headers will be added to each request when all development goals
 *       have been reached.
 */

function login(email: string, password: string): Promise<LOGIN_ROUTE_RESPONSE> {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password })
	}

	return fetch(`${API_LINK}/api/login`, requestOptions)
		.then(handleLoginResponse)
		.then((response: LOGIN_ROUTE_RESPONSE): LOGIN_ROUTE_RESPONSE => {
			if (response.payload.user) {
				response.payload.user.authdata = window.btoa(email + ":" + password)
				localStorage.setItem("chat_user", JSON.stringify(response.payload.user))
			}
			return response
		})
}

function register(register_obj: REGISTER_OBJECT): Promise<REGISTERED_USER> {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(register_obj)
	}

	return fetch(`${API_LINK}/api/register`, requestOptions)
		.then(handleResponse)
		.then((user: REGISTERED_USER): REGISTERED_USER => {
			user.authdata = window.btoa(user.email + ":" + user.passwrd)
			localStorage.setItem("chat_user", JSON.stringify(user))
			return user
		})
}

function logout(user_id: string | number): Promise<void> {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ user_id: user_id })
	}

	return fetch(`${API_LINK}/api/logout`, requestOptions)
		.then(handleResponse)
		.then((resolve: void) => {
			localStorage.removeItem("chat_user")
			localStorage.clear()
		})
		.catch((err: Error) => {
			localStorage.removeItem("chat_user")
			localStorage.clear()
		})
}

function clearCache(): void {
	localStorage.removeItem("chat_user")
	localStorage.clear()
}

function getAllChannels(user_id: string | number): Promise<CHANNELS[]> {
	const requestOptions = {
		method: "GET",
		headers: authHeader()
	}

	return fetch(`${API_LINK}/api/channels/${user_id}`, requestOptions)
		.then(handleResponse)
		.then((channels: Array<CHANNELS>): CHANNELS[] => {
			return channels
		})
}

function getChannelMessages(channel_id: string | number): Promise<CHANNEL_MESSAGES[]> {
	const requestOptions = {
		method: "GET",
		headers: authHeader()
	}

	return fetch(`${API_LINK}/api/channels/messages/${channel_id}`, requestOptions)
		.then(handleResponse)
		.then((messages: Array<CHANNEL_MESSAGES>): CHANNEL_MESSAGES[] => {
			return messages
		})
}

function getAllUserFriends(user_id: string | number): Promise<any> {
	const requestOptions = {
		method: "GET",
		headers: authHeader()
	}

	return fetch(`${API_LINK}/api/friends/${user_id}`, requestOptions)
		.then(handleResponse)
		.then((friends: any): any => {
			return friends
		})
}

function saveSelectedChannel(ctx: SAVE_SELECTED_CHANNEL_OBJECT): Promise<SIDE_PANEL_CHANNEL_MESSAGE> {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(ctx)
	}

	return fetch(`${API_LINK}/api/channels/save-selected-channel`, requestOptions)
		.then(handleResponse)
		.then((response: SIDE_PANEL_CHANNEL_MESSAGE): SIDE_PANEL_CHANNEL_MESSAGE => {
			return response
		})
}

function saveSelectedHome(user_id: string | number): Promise<void> {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ user_id: user_id })
	}

	return fetch(`${API_LINK}/api/user/home`, requestOptions)
		.then(handleResponse)
		.then((response: void): void => {
			return response
		})
}

function saveSelectedServer(ctx: SAVE_SELECTED_SERVER_OBJECT): Promise<SELECTED_SERVER> {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(ctx)
	}

	return fetch(`${API_LINK}/api/servers/save-selected-server`, requestOptions)
		.then(handleResponse)
		.then((response: SELECTED_SERVER): SELECTED_SERVER => {
			return response
		})
}

function saveMessage(ctx: SAVE_MESSAGE_OBJECT): Promise<void> {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(ctx)
	}

	return fetch(`${API_LINK}/api/channels/save-message`, requestOptions)
		.then(handleResponse)
		.then((response: void): void => {
			return response
		})
}