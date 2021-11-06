class Update_Channel_Messages {
	constructor() {
		this.handle = this.handle.bind(this)
	}

	handle(msg) {
		const { userService, state, dispatch } = msg

		console.log("[BAREBONES]: UPDATE_CHANNEL_MESSAGES response from Nebuchadnezzar")
		return userService
			.getChannelMessages(state.dashboard.selected_server.selected_channel_id)
			.then(messages => {
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