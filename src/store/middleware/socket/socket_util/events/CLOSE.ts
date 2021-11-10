class Close {
	static EVENT: string

	public constructor() {
		this.handle = this.handle.bind(this)
	}

	public handle<SOCKET_CLOSE_PLAYLOAD>(msg: HANDLER_MESSAGE<SOCKET_CLOSE_PLAYLOAD>): void {
		const { socket } = msg
		socket.close()
	}
} 

Close.EVENT = "CLOSE"
export default Close