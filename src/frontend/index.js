import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { PrivateRoute } from './PrivateRoute'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../frontend/store'
import Login from './Components/Login'
import Register from './Components/Register'
import { Dashboard } from './Components/Dashboard'

import * as serviceWorker from './serviceworker'
import "antd/dist/antd.css"
import styles from './app.module.scss'

class App extends React.Component {
    render() {
        return (
            <Provider store={store} className={styles.app}>
              <PersistGate loading={null} persistor={persistor}>
                <Router>
                  <TransitionGroup className="transition-group">
                      <CSSTransition
                        timeout={{ enter: 300, exit: 300 }}
                        classNames="fade"
                      >
                          <Switch>
                            <PrivateRoute exact path="/" component={Dashboard} />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Redirect from="*" to="/" />
                          </Switch>
                      </CSSTransition>
                  </TransitionGroup>
                </Router>
              </PersistGate>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"))
serviceWorker.unregister()