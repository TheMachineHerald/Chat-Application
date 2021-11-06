class Connected_User {
	constructor() {
		this.handle = this.handle.bind(this)
	}

	handle(msg) {
		const { channelService, state, dispatch } = msg
		console.log("[BAREBONES]: CONNECTED_USER message response from Nebuchadnezzar")

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

Connected_User.EVENT = "CONNECTED_USER"
export default Connected_User