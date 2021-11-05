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
				// auto logout if 401 response returned from api
				return -1
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