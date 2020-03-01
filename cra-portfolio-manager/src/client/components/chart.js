import React, { Component } from 'react';
import {getStockThunk} from '../store/';
import {connect} from 'react-redux'
const d3 = require('d3');
const techan = require('techan-js');

//On componentDidMount(), when the svg gets into the DOM we render the chart.
//We need the state in this component to build the chart.
//Hence we need to connect it to the store, mapStateToProps and mapDispatchToProps.
//Then we basically wrap the whole d3 building and rendering logic into one buildChart function that gets executed upon componentDidMount()
class disconnectedChart extends Component {
  componentDidMount() {
    this.props.getStock(this.props.stock)
    this.buildChart()
  }
  buildChart() {
    //get the data from the state:
    //stocks[0]['Time Series (5min)']
    //console.log('this state time series: ', this.state.stocks[0]['Time Series (5min)'])

    const width = 600;
    const height = 600;
    const fill = 'green';
    //Should select the div with id='chart' provided by the parent singleStock component
    const svg = d3.select('body') //was 'chart'
      .append('svg')
      .attr("width", width)
      .attr('height', height)
      .attr('fill', fill);
      // return (
      //   <div>
      //   <h4>This is the Chart Component</h4>
      //   <svg width="600" height="600" fill="gray">
      //     <rect x="0" y="0" width="40" height="40" />
      //   </svg>
      // </div>
      // )

    svg.append('rect')
      .attr('width', 40)
      .attr('height', 40)
      .attr('fill', 'yellow')

    return svg;
    }
    render() {
      return <div id="chart">
        <h3>The Single Stock Chart is below for {this.props.stock}: </h3>
      </div>
    }

}

//Both mapStateToProps and mapDispatchToProps return objects
function mapStateToProps(state) {
  return {
    stocks: this.state,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    //returns a function that, when called, dispatches a thunk:
    getStock: function(ticker) {
      dispatch(getStockThunk(ticker))
    }
  }
}

const Chart = connect(mapStateToProps, mapDispatchToProps)(disconnectedChart);
export default Chart;
