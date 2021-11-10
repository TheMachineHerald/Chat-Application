class Pong {
	static EVENT: string

	constructor() {
		this.handle = this.handle.bind(this)
	}

	public handle<PONG_PAYLOAD>(msg: HANDLER_MESSAGE<PONG_PAYLOAD>): void {
		console.log("[BAREBONES]: Pong from Nebuchadnezzar")
	}
}

Pong.EVENT = "PONG"
export default Pong