class Update_Channel_Messages {
	static EVENT: string

	public constructor() {
		this.handle = this.handle.bind(this)
	}

	public handle<UPDATE_CHANNEL_MESSAGES_MESSAGE>(msg: HANDLER_MESSAGE<UPDATE_CHANNEL_MESSAGES_MESSAGE>): Promise<void> {
		const { channelService, state, dispatch } = msg

		console.log("[BAREBONES]: UPDATE_CHANNEL_MESSAGES response from Nebuchadnezzar")
		return channelService
				.getChannelMessages(state.dashboard.selected_server.selected_channel_id)
				.then((messages: any): void => {
					dispatch({
						type: "POPULATE_CHANNEL_MESSAGES",
						payload: messages
					})
				})
				.catch((err: _Error): void => console.log("get channel messages err: ", err))
	}
}

Update_Channel_Messages.EVENT = "UPDATE_CHANNEL_MESSAGES"
export default Update_Channel_Messages