import React from "react"
import ReactDOM from "react-dom"
import './index.css'

import SidePanel from './SidePanel'
import Chat from './Chat'

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <SidePanel />
        <Chat />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))