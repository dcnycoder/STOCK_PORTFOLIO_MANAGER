import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getStockThunk} from '../store';
import Chart from './chart';

class DisconnectedSingleStock extends Component {
  componentDidMount() {
    //Was getting an error in the state
    // this.props.getStock(this.props.match.params.ticker)
  }
  render() {
    //console.log('singleStock this.props: ', this.props.match.params.ticker)
    return (
      <div id="singleStock">
        <h2>Single Stock Page: </h2>
        <div id="chart">
          <Chart ticker={this.props.match.params.ticker}/>
        </div>
      </div>
      // <div id="chart" style="width: 100%; height: 250px"></div>
    )
  }
}

//export default DisconnetedSingleStock

const mapStateToProps = state => {
  console.log('state in singleStock mapStateToProps: ', state)
  return {
    //stocks: state.stocks
    state: state,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getStock: ticker => dispatch(getStockThunk(ticker))
  }
}

export const SingleStock = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedSingleStock
)
