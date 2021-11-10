class Barebones_Socket {
	private ws: WebSocket
	private device: WebRTC_Client
	private client: CLIENT_QUERY_PARAMS
	private opts: SOCKET_OPTIONS_EXT
	private repeat: number
	private block_reconnect: boolean
	private lock_reconnect: boolean
	private ping_timeout_id: null | ReturnType<typeof setTimeout> = null
	private pong_timeout_id: null | ReturnType<typeof setTimeout> = null
	
	public onclose: () => void
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
		this.beat_it = this.beat_it.bind(this)
		this.beat_the_heart = this.beat_the_heart.bind(this)
		this.reset_the_heart_beater = this.reset_the_heart_beater.bind(this)
		this.reconnect = this.reconnect.bind(this)
		this.send = this.send.bind(this)
		this.close = this.close.bind(this)

		this.onclose = () => {}
		this.onerror = () => {}
		this.onopen = () => {}
		this.onmessage = (event: MessageEvent<any>): void => {}
		this.onreconnect = () => {}

		this.create_web_socket()
	}

	public create_web_socket(): void {
		if (!this.client.user_name || this.ws !== null) {
			//this is for dev
			console.log("[SOCKET][CREATE_WEB_SOCKET()] => BLOCKED!!!")
			return
		}
		try {
			console.log("[Socket][CREATE_WEB_SOCKET()] => CREATING... ", this.ws)
			this.ws = new WebSocket(`${this.opts.url}/?client=${this.client.user_name}-${this.client.id}`)
			this.init_event_handlers()
		} catch (e) {
			console.log(e)
			this.reconnect()
		}
	}

	public init_event_handlers(): void {
		this.ws.onopen = (event) => {
			this.repeat = 0
			this.onopen()
			this.beat_it()
		}

		this.ws.onclose = (event) => {
			this.onclose()
			this.reconnect()
		}

		this.ws.onerror = (error) => {
			console.log(error)
		}

		this.ws.onmessage = (event: MessageEvent<any> ): void => {
			this.onmessage(event)
			this.beat_it()
		}
	}

	public beat_it(): void {
		this.reset_the_heart_beater()
		this.beat_the_heart()
	}

	public beat_the_heart(): void {
		if (this.block_reconnect) return
        
		this.ping_timeout_id = setTimeout(() => {
			this.ws.send(JSON.stringify({ event: this.opts.ping_message }))
			this.pong_timeout_id = setTimeout(() => {
				this.ws.close()
			}, this.opts.pong_timeout)
		}, this.opts.ping_timeout)
	}

	public reset_the_heart_beater(): void {
		clearTimeout(this.ping_timeout_id)
		clearTimeout(this.pong_timeout_id)
	}

	//Wrappers on WebSocket API
	public reconnect(): void {
		this.lock_reconnect = true
		this.repeat++

		this.onreconnect()
		window.setTimeout(() => {
			this.create_web_socket()
			this.lock_reconnect = false
		}, this.opts.reconnect_timeout)
	}

	public send(payload): void {
		this.ws.send(payload)
	}

	public close(code, reason): void {
		this.block_reconnect = true
		this.reset_the_heart_beater()
		this.ws.close(code, reason)
	}

	public set_device(device): void {
		this.device = device
	}
}

export default Barebones_Socket