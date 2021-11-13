class _WebSocket {
	private ws: WebSocket
	private device: WebRTC_Client
	private client: CLIENT_QUERY_PARAMS
	private opts: SOCKET_OPTIONS_EXT
	private repeat: number
	private block_reconnect: boolean
	private lock_reconnect: boolean
	private ping_timeout_id: null | ReturnType<typeof setTimeout> = null
	private pong_timeout_id: null | ReturnType<typeof setTimeout> = null
	
	public onclose: (event: any) => void
	public onerror: () => void
	public onopen: () => void
	public onmessage: (event: MessageEvent<any>) => void
	public onreconnect: () => void

	public constructor(opts: SOCKET_OPTIONS, client: CLIENT_QUERY_PARAMS) {
		this.ws = null
		this.device = null
		this.client = {
			id: client.id,
			user_name: client.user_name
		}

		this.opts = {
			url: opts.url,
			ping_timeout: opts.ping_timeout,
			pong_timeout: opts.pong_timeout,
			reconnect_timeout: opts.reconnect_timeout,
			ping_message: "PING",
			repeat_limit: null
		}

		this.repeat = 0
		this.block_reconnect = false
		this.lock_reconnect = false
		this.ping_timeout_id = null
		this.pong_timeout_id = null

		this.create_web_socket = this.create_web_socket.bind(this)
		this.init_event_handlers = this.init_event_handlers.bind(this)
		this.send = this.send.bind(this)
		this.close = this.close.bind(this)

		this.onclose = (event: any) => {}
		this.onerror = () => {}
		this.onopen = () => {}
		this.onmessage = (event: MessageEvent<any>): void => {}
		this.onreconnect = () => {}

		this.create_web_socket()
	}

	public create_web_socket(): void {
		if (!this.client.user_name || this.ws !== null) {
			console.log("[SOCKET][CREATE_WEB_SOCKET()] => BLOCKED!!!")
			return
		}
		try {
			console.log("[Socket][CREATE_WEB_SOCKET()] => CREATING... ", this.ws)
			this.ws = new WebSocket(`${this.opts.url}/?client=${this.client.user_name}-${this.client.id}`)
			this.init_event_handlers()
		} catch (e) {
			console.log(e)
			// reconnect method here
		}
	}

	public init_event_handlers(): void {
		this.ws.onopen = (event) => {
			this.repeat = 0
			this.onopen()
			// heartbeat/pinging method here
		}

		this.ws.onclose = (event) => {
			console.log(event)
			this.onclose(event)
			this.create_web_socket()
			// reconnect method-- determined by close event
		}

		this.ws.onerror = (error) => {
			console.log(error)
		}

		this.ws.onmessage = (event: MessageEvent<any> ): void => {
			this.onmessage(event)
			// heartbeat/pinging method here
		}
	}

	public send(payload): void {
		this.ws.send(payload)
	}

	public close(code, reason): void {
		this.ws.close(code, reason)
	}

	public set_device(device): void {
		this.device = device
	}
}

export default _WebSocket