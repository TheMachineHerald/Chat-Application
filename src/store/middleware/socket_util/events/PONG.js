class Pong {
	constructor() {
		this.handle = this.handle.bind(this)
	}

	handle(msg) {
		console.log("[BAREBONES]: Pong from Nebuchadnezzar")
	}
}

Pong.EVENT = "PONG"
export default Pong