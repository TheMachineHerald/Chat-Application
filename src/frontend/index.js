import React from "react"
import ReactDOM from "react-dom"

import SidePanel from './Components/SidePanel'
import Chat from './Components/Chat'
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