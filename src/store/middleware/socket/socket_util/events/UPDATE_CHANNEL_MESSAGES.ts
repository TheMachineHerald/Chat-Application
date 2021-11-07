class Update_Channel_Messages {
	static EVENT: string

	constructor() {
		this.handle = this.handle.bind(this)
	}

	handle<UPDATE_CHANNEL_MESSAGES_MESSAGE>(msg: HANDLER_MESSAGE<UPDATE_CHANNEL_MESSAGES_MESSAGE>): Promise<void> {
		const { userService, state, dispatch } = msg

		console.log("[BAREBONES]: UPDATE_CHANNEL_MESSAGES response from Nebuchadnezzar")
		return userService
				.getChannelMessages(state.dashboard.selected_server.selected_channel_id)
				.then((messages: any) => {
					dispatch({
						type: "POPULATE_CHANNEL_MESSAGES",
						payload: messages
					})
				})
				.catch(err => console.log("get channel messages err: ", err))
	}
}

Update_Channel_Messages.EVENT = "UPDATE_CHANNEL_MESSAGES"
export default Update_Channel_Messages