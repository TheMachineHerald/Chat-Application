class Barebones_Socket {
	constructor(opts, client) {
		console.log("[BAREBONES INIT]")
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
			ping_message: "ping",
			repeat_limit: null
		}
		this.repeat = 0

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
		this.onmessage = () => {}
		this.onreconnect = () => {}

		this.create_web_socket()
	}

	create_web_socket() {
		if (!this.client.user_name || this.ws !== null) {
			console.log("ATTEMPT CREATE WS, BLOCKED")
			return
		}
		try {
			console.log("[CREATING WEBSOCKET] ", this.ws)
			this.ws = new WebSocket(`${this.opts.url}/?client=${this.client.user_name}-${this.client.id}`)
			this.init_event_handlers()
		} catch (e) {
			console.log(e.message)
			this.reconnect()
		}
	}

	init_event_handlers() {
		this.ws.onopen = event => {
			this.repeat = 0
			this.onopen()
			this.beat_it()
		}

		this.ws.onclose = event => {
			this.onclose()
			this.reconnect()
		}

		this.ws.onerror = error => {
			console.log(error)
		}

		this.ws.onmessage = event => {
			this.onmessage(event)
			this.beat_it()
		}
	}

	beat_it() {
		this.reset_the_heart_beater()
		this.beat_the_heart()
	}

	beat_the_heart() {
		if (this.block_reconnect) return
        
		this.ping_timeout_id = setTimeout(() => {
			this.ws.send(JSON.stringify({event: this.opts.ping_message}))
			this.pong_timeout_id = setTimeout(() => {
				this.ws.close()
			}, this.opts.pong_timeout)
		}, this.opts.ping_timeout)
	}

	reset_the_heart_beater() {
		clearTimeout(this.ping_timeout_id)
		clearTimeout(this.pong_timeout_id)
	}

	//Wrappers on WebSocket API
	reconnect() {
		this.lock_reconnect = true
		this.repeat++

		this.onreconnect()
		setTimeout(() => {
			this.create_web_socket()
			this.lock_reconnect = false
		}, this.opts.reconnect_timeout)
	}

	send(payload) {
		this.ws.send(payload)
	}

	close(code, reason) {
		this.block_reconnect = true
		this.reset_the_heart_beater()
		this.ws.close(code, reason)
	}

	//binds webRTC client to socket connection object
	set_device(device) {
		this.device = device
	}
}

export default Barebones_Socket