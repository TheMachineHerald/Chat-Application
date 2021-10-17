import React from "react"
import ReactDOM from "react-dom"
import "antd/dist/antd.css"

import Login from './Components/Login'
import Dashboard from './Components/Dashboard'

import styles from './app.module.scss'

class App extends React.Component {
  render() {
    const user = false
    return (
      <div className={styles.app}>
        { user ?  <Dashboard /> : <Login /> }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))