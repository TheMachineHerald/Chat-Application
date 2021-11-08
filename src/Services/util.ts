export {
	handleResponse,
	handleLoginResponse
}

function handleLoginResponse(response) {
	return response
		.text()
		.then(text => {
			const data = text && JSON.parse(text)
			if (response.status != 200) {
				return -1
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