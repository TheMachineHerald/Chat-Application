class Update_Selected_Channel {
	static EVENT: string

	constructor() {
		this.handle = this.handle.bind(this)
	}

	public handle<UPDATE_SELECTED_CHANNEL_MESSAGE>(msg: HANDLER_MESSAGE<UPDATE_SELECTED_CHANNEL_MESSAGE>): void {
		console.log("[BAREBONES][UPDATE_SELECTED_CHANNEL][200]")
	}
}

Update_Selected_Channel.EVENT = "UPDATE_SELECTED_CHANNEL"
export default Update_Selected_Channel