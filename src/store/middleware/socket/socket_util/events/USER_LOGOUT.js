class User_Logout {
	constructor() {
		this.handle = this.handle.bind(this)
	}

	handle(msg) {
		const { channelService, state, dispatch } = msg

		console.log("[BAREBONES]: USER_LOGOUT response from Nebuchadnezzar")
		return channelService
			.getChannelUsers(state.dashboard.selected_server.selected_channel_id)
			.then(users => {
				dispatch({
					type: "POPULATE_CHANNEL_USERS",
					payload: users
				})
			})
			.catch(err => console.log(err)) 
	}
}

User_Logout.EVENT = "USER_LOGOUT"
export default User_Logout