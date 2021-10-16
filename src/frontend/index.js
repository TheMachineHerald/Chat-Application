import React from "react"
import ReactDOM from "react-dom"

import SidePanel from './SidePanel'
import Chat from './Chat'
import styles from './app.module.scss'

class App extends React.Component {
  render() {
    return (
      <div className={styles.app}>
        <SidePanel />
        <Chat />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))