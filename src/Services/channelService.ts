import { authHeader } from "./AuthHeader"
import { handleResponse } from "./util"

// API_URL-- just for dev
const API_LINK = "http://localhost:3001"

export const channelService = {
	getAllChannels,
	getChannelMessages,
	getChannelUsers,
	saveMessage
}

function getChannelMessages(channel_id: number | string): Promise<CHANNEL_MESSAGES[]> {
	const requestOptions = {
		method: "GET",
		headers: authHeader()
	}

	return fetch(`${API_LINK}/api/channels/messages/${channel_id}`, requestOptions)
		.then(handleResponse)
		.then((response: Array<CHANNEL_MESSAGES>): CHANNEL_MESSAGES[] => {
			return response
		})
}

function getChannelUsers(channel_id: string | number): Promise<CHANNEL_USER[]> {
	const requestOptions = {
		method: "GET",
		headers: authHeader()
	}

	return fetch(`${API_LINK}/api/channels/users/${channel_id}`, requestOptions)
		.then(handleResponse)
		.then((response: Array<CHANNEL_USER>): CHANNEL_USER[] => {
			return response
		})
}

function getAllChannels(user_id: number | string): Promise<CHANNELS> {
	const requestOptions = {
		method: "GET",
		headers: authHeader()
	}

	return fetch(`${API_LINK}/api/channels/${user_id}`, requestOptions)
		.then(handleResponse)
		.then((response: CHANNELS): CHANNELS => {
			return response
		})
}

function saveMessage(ctx: SAVE_MESSAGE_REQUEST): Promise<void> {
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