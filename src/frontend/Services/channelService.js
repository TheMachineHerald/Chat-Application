import { authHeader } from "./AuthHeader"
import { handleResponse } from "./util"

// API_URL-- just for dev
const API_LINK = "http://localhost:3001"

export const channelService = {
	getAllChannels,
	getChannelMessages,
	getChannelUsers
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

function getChannelUsers(channel_id) {
	const requestOptions = {
		method: "GET",
		headers: authHeader()
	}

	return fetch(`${API_LINK}/api/channels/users/${channel_id}`, requestOptions)
		.then(handleResponse)
		.then(channel_users => {
			return channel_users
		})
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