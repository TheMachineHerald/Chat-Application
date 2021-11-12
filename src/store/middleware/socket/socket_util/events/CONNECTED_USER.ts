class Connected_User {
	static EVENT: string

	public constructor() {
		this.handle = this.handle.bind(this)
	}

	public handle<CONNECTED_USER_PAYLOAD>(msg: HANDLER_MESSAGE<CONNECTED_USER_PAYLOAD>): void {
		const { payload, userService, channelService, state, dispatch } = msg
		console.log("[BAREBONES]: CONNECTED_USER message response from Nebuchadnezzar")

		if (state.user.home_selected) {
			return userService
				.getAllUserFriends(state.user.id)
				.then((resolve: Array<CHANNEL_USER>): void => {
					dispatch({
						type: "POPULATE_FRIEND_LIST",
						payload: resolve
					})
				})
				.catch((err: _Error): void => console.log(err))
			
		}

		return channelService
				.getChannelUsers(state.dashboard.selected_server.selected_channel_id)
				.then((resolve: Array<CHANNEL_USER>): void => {
					dispatch({
						type: "POPULATE_CHANNEL_USERS",
						payload: resolve
					})
				})
				.catch((err: _Error): void => console.log(err)) 
	}
}

Connected_User.EVENT = "CONNECTED_USER"
export default Connected_User