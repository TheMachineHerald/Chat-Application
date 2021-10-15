import React from "react"
import ReactDOM from "react-dom"
import './index.css'

import SidePanel from './SidePanel'

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <SidePanel />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))