/**
 * 
 * @returns Object with Authorization header or empty {}
 * @NOTE No type will be made since this is still for DEV
 */
export function authHeader() {
	const user: CHAT_USER = JSON.parse(localStorage.getItem("chat_user"))

	if (user && user.authdata) 
		return { Authorization: "Basic " + user.authdata }
	return {}
}