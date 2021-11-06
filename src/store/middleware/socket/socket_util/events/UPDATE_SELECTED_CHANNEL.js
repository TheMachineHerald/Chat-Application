class Update_Selected_Channel {
	constructor() {
		this.handle = this.handle.bind(this)
	}

	handle(msg) {
		console.log("[BAREBONES][UPDATE_SELECTED_CHANNEL][200]")
	}
}

Update_Selected_Channel.EVENT = "UPDATE_SELECTED_CHANNEL"
export default Update_Selected_Channel