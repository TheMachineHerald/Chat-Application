class Close {
	constructor() {
		this.handle = this.handle.bind(this)
	}

	handle(msg) {
		const { socket } = msg
		socket.close()
	}
}

Close.EVENT = "CLOSE"
export default Close