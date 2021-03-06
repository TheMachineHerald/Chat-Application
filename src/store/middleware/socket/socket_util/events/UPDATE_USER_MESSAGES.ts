class Update_User_Messages {
	static EVENT: string

	public constructor() {
		this.handle = this.handle.bind(this)
	}

	public handle<UPDATE_USER_MESSAGES_MESSAGE>(msg: HANDLER_MESSAGE<UPDATE_USER_MESSAGES_MESSAGE>): Promise<void> {
		const { userService, state, dispatch } = msg
		const ctx: GET_USER_MESSAGES_REQUEST = {
			user_id: state.user.id,
			friend_id: state.user.selected_friend_id
		}

		console.log("[BAREBONES]: UPDATE_CHANNEL_MESSAGES response from Nebuchadnezzar: ", msg.payload)
		return userService
				.getUserMessages(ctx)
				.then((resolve: any): void => {
					dispatch({
						type: "POPULATE_USER_MESSAGES",
						payload: resolve
					})
				})
				.catch((err: _Error): void => {
					console.log("get user messages err: ", err)
				})
	}
}

Update_User_Messages.EVENT = "UPDATE_USER_MESSAGES"
export default Update_User_Messages