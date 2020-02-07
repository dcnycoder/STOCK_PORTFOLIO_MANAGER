import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getStockThunk} from '../store'

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
      <div>
        <h2>Single Stock Page: </h2>
        {/* <canvas>Canvas</canvas> */}
        <svg width="100" height="100" fill="yellow">
          <rect x="0" y="0" width="60" height="60" />
        </svg>
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
