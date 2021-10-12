class Barebones_Socket {
  constructor(opts, redux) {
    this.ws = null
    this.opts = {
      url: opts.url,
      ping_timeout: opts.pingTimeout,
      pong_timeout: opts.pongTimeout,
      reconnect_timeout: opts.reconnectTimeout,
      ping_message: 'heartbeat',
      repeat_limit: null,
    }
    this.repeat = 0

    this.createWebSocket = this.createWebSocket.bind(this)
    this.initEventHandlers = this.initEventHandlers.bind(this)
    this.beatIt = this.beatIt.bind(this)
    this.beatTheHeart = this.beatTheHeart.bind(this)
    this.resetTheHeartBeater = this.resetTheHeartBeater.bind(this)
    this.reconnect = this.reconnect.bind(this)
    this.send = this.send.bind(this)
    this.close = this.close.bind(this)

    this.onclose = () => {}
    this.onerror = () => {}
    this.onopen = () => {}
    this.onmessage = () => {}
    this.onreconnect = () => {}

    //Redux Bindings
    
    //Dispatchers
    this.dispatch = {
      saveWebsocket: redux.saveWebsocket,
      setActiveCall: redux.setActiveCall,
      endCall: redux.endCall,
      setUsers: redux.setUsers,
      saveReservation: redux.saveReservation,
      saveReservations: redux.saveReservations,
      removeReservation: redux.removeReservation,
      addConferenceSid: redux.addConferenceSid,
      setUserCallSid: redux.setUserCallSid
    }

    //Redux State
    this.device = redux.device
    this.activeCall = redux.activeCall

    this.createWebSocket()
  }

  createWebSocket() {
    try {
      this.ws = new WebSocket(this.opts.url)
      this.dispatch.saveWebsocket(this.ws)
      this.initEventHandlers()
    } catch (e) {
      console.log(e.message)
      this.reconnect()
    }
  }

  initEventHandlers() {
    this.ws.onopen = (event) => {
      this.repeat = 0
      this.onopen()
      this.beatIt()
    }

    this.ws.onclose = (event) => {
      this.onclose()
      this.reconnect()
    }

    this.ws.onerror = error => {
      console.log(error)
    }

    this.ws.onmessage = event => {
      const payload = JSON.parse(event.data)

      if (payload.event == 'userJoinedCall') {
        this.dispatch.setActiveCall(payload.data)
      }

      if (payload.event == 'conferenceStarted') {
        this.dispatch.addConferenceSid(payload.data)
      }

      if (payload.event == 'activeConferenceAdded') {
        this.dispatch.addConferenceSid(payload.data)
      }

      if (payload.event == 'userEndedConference') {
        this.dispatch.removeReservation(payload)
        this.dispatch.endCall({})
      }

      //modify this event
      if (payload.event == 'userLeftCall') {
        this.dispatch.removeReservation(payload)
      }

      if (payload.event == 'clientHydration') {
        try {
          //Backend data model has to match this
          const userList = payload.data.Users
          this.dispatch.setUsers(userList)
        } catch (e) {
          console.log(e.message)
        }
      }
      this.onmessage(event)
      this.beatIt()
    }
  }

  beatIt() {
    this.resetTheHeartBeater()
    this.beatTheHeart()
  }

  beatTheHeart() {
    if (this.blockReconnect) return
    this.pingTimeoutId = setTimeout(() => {
      this.ws.send(this.opts.ping_message)
      this.pongTimeoutId = setTimeout(() => {
        this.ws.close()
      }, this.opts.pong_timeout)
    }, this.opts.ping_timeout)
  }

  resetTheHeartBeater() {
    clearTimeout(this.pingTimeoutId)
    clearTimeout(this.pongTimeoutId)
  }

  //Wrappers on WebSocket API
  reconnect() {
    this.lockReconnect = true
    this.repeat++

    this.onreconnect()
    setTimeout(() => {
      this.createWebSocket()
      this.lockReconnect = false
    }, this.opts.reconnect_timeout)
  }

  send(payload) {
    return this.ws.send(payload)
  }

  close() {
    this.blockReconnect = true
    this.resetTheHeartBeater()
    this.ws.close()
  }
  //binds webRTC client to socket connection object
  setDevice(device) {
    this.device = device
  }
}

export default Barebones_Socket