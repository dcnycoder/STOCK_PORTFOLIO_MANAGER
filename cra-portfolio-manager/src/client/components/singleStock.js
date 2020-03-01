import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getStockThunk} from '../store';
import Chart from './chart';

class DisconnectedSingleStock extends Component {
  // ComponentDidMount() {
  //   //console.log("singleStock this.props: ", this.props);
  //   this.props.getStock(req.params.ticker)
  // }
  componentDidMount() {
    this.props.getStock(this.props.match.params.ticker)
  }
  render() {
    console.log('singleStock this.props: ', this.props.match.params.ticker)
    return (
      <div id="singleStock">
        <h2>Single Stock Page: </h2>
        <div id="chart">
          <Chart stock={this.props.match.params.ticker}/>
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
    stocks: state.stocks
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
