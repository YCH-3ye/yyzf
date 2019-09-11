import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Link,
  Route
} from 'react-router-dom'

import City from './pages/City'
import Home from './pages/Home'
import Map from './pages/Map'
import NoMatch from './pages/NoMatch'

class App extends Component {
  render() {
    // 定义全局路由histype模式
    return (
      <Router>
        {/* yong */}
        <Switch>
          <Redirect exact from="/" to="/home"></Redirect>
          <Route path="/home" component={Home}></Route>
          <Route path="/city" component={City}></Route>
          <Route path="/map" component={Map}></Route>
          <Route component={NoMatch}></Route>
        </Switch>
      </Router>
    )
  }
}
export default App
