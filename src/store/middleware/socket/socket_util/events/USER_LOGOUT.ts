class User_Logout {
	static EVENT: string

	constructor() {
		this.handle = this.handle.bind(this)
	}

	handle<USER_LOGOUT_MESSAGE>(msg: HANDLER_MESSAGE<USER_LOGOUT_MESSAGE>): Promise<void> {
		const { channelService, state, dispatch } = msg

		console.log("[BAREBONES]: USER_LOGOUT response from Nebuchadnezzar")
		return channelService
				.getChannelUsers(state.dashboard.selected_server.selected_channel_id)
				.then((users: Array<CHANNEL_USER>) => {
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