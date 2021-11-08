class Connected_User {
	static EVENT: string

	constructor() {
		this.handle = this.handle.bind(this)
	}

	handle<CONNECTED_USER_PAYLOAD>(msg: HANDLER_MESSAGE<CONNECTED_USER_PAYLOAD>): void {
		const { channelService, state, dispatch } = msg
		console.log("[BAREBONES]: CONNECTED_USER message response from Nebuchadnezzar")

		return channelService
				.getChannelUsers(state.dashboard.selected_server.selected_channel_id)
				.then((users: Array<CHANNEL_USER>): void => {
					dispatch({
						type: "POPULATE_CHANNEL_USERS",
						payload: users
					})
				})
				.catch((err: _Error): void => console.log(err)) 
	}
}

Connected_User.EVENT = "CONNECTED_USER"
export default Connected_User