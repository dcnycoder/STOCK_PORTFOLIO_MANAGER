import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import history from './history'
import {Main} from './components/main'
import {SingleStock} from './components/singleStock'
import {Chart} from './components/chart'

//import Routes from './routes'

class App extends Component {
  render() {
    return (
      // <Router history={history}></Router>
      <Router>
        <Switch>

          <Route path="/chart" component={SingleStock} />
          <Route path="/stocks/:ticker" component={SingleStock} />
          {/* <Route path="/" component={SingleStock} /> */}
          <Route path="/" component={Main} />



          {/* <Route path="inbox" component={Inbox}> */}
        </Switch>
      </Router>
    )
  }
}

export default App
