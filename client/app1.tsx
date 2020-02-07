import React, {Component} from 'react'

import {Main} from './components/main';
import {SearchForm} from './components/searchform';

import Routes from './routes'

class App extends Component {
  render() {
    return (
      <div>
        <Main />
        <SearchForm />
      </div>
    )
  }
}

export default App
