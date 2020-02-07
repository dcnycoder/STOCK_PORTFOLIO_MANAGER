import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getStocksThunk} from '../store'
import {Link} from 'react-router-dom'
import {SingleStock} from './singleStock'

class DisconnectedMain extends Component {
  componentDidMount() {
    this.props.getStocks()
  }
  render() {
    console.log('this.props.stocks: ', this.props.stocks)
    return (
      <div>
        <h3>Welcome to the Stock App!!</h3>
        <h3>THE STOCK APP!</h3>

        <ul>
          {this.props.stocks.map(elem => {
            return (
              <li key={elem.ticker}>
                Stock: <Link to={`/stocks/${elem.ticker}`}>{elem.ticker}</Link>{' '}
                Price: {elem.price}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('state in mapStateToProps: ', state)
  return {
    stocks: state.stocks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getStocks: () => dispatch(getStocksThunk())
  }
}

export const Main = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedMain
)

//export default Main;
