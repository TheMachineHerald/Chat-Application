class User_Logout {
	static EVENT: string

	public constructor() {
		this.handle = this.handle.bind(this)
	}

	public handle<USER_LOGOUT_MESSAGE>(msg: HANDLER_MESSAGE<USER_LOGOUT_MESSAGE>): Promise<void> {
		const { userService, channelService, state, dispatch } = msg
		console.log("[BAREBONES]: USER_LOGOUT response from Nebuchadnezzar")

		if (state.user.home_selected) {
			return userService
					.getAllUserFriends(state.user.id)
					.then((friends: Array<CHANNEL_USER>): void => {
						dispatch({
							type: "POPULATE_FRIEND_LIST",
							payload: friends
						})
					})
					.catch((err: _Error): void => console.log(err))
		}

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

User_Logout.EVENT = "USER_LOGOUT"
export default User_Logout