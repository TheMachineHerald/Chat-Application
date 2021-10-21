import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { Provider } from 'react-redux'
import store from '../frontend/store'
import "antd/dist/antd.css"

import Login from './Components/Login'
import Register from './Components/Register'
import Dashboard from './Components/Dashboard'

import styles from './app.module.scss'
import * as serviceWorker from './serviceworker';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={store} className={styles.app}>
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))
serviceWorker.unregister()