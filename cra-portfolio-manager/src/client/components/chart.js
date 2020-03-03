import React, { Component } from 'react';
import {getStockThunk} from '../store/';
import {connect} from 'react-redux'
const d3 = require('d3');
const techan = require('techan-js');

//On componentDidMount(), when the svg gets into the DOM we render the chart.
//We need the state in this component to build the chart.
//Hence we need to connect it to the store, mapStateToProps and mapDispatchToProps.
//Then we just wrap the whole d3 building and rendering logic into one buildChart function that gets executed upon componentDidMount()
class disconnectedChart extends Component {
  componentDidMount() {
    this.props.getStock(this.props.ticker);
  }
  //To make sure that after the getSingleStock thunk is finished and the updated state forces a component re-render, ONLY THEN we run the this.buildChart() so that it has access to the correct stock info.
  componentDidUpdate(prevProps, prevState) {
    console.log('Chart previous props: ', prevProps)
    console.log('Chart previous state: ', prevState);
    console.log("State stocks in compDidUpdate: ", this.props.stocks);
    if (this.props.stocks) this.buildChart();
  }

  buildChart() {
    console.log("build chart called!")
    //get the data from the state:
    // console.log("this.props.stocks in buildChart: ", this.props.stocks['Time Series (5min)']);
    //if (!this.state) console.log("Wait, still loading...")
    // else console.log("The state has loaded!");
    // console.log('State in buildChart: ', this.state);

    //GET DATA FROM this.props.stocks:
    //Maybe a better way to run an explicit Alphavantage API call to get the clean json. Makes data manipulation easier
    //D3.json returns a promise

    //THEN version of the promise:


    // WRAP THE WHOLE D3 logic in d3.json:
    // D3.JSON FORMAT:
    // d3.json('url', rowConverter func, (data) => {
    //   do something with the data obtained;
    // })
    // IMPORTANT: ROWCONVERTER FUNCTION:
    // let rowConverter = function(d)
    let timeSeries = this.props.stocks['Time Series (5min)'];

    // Convert dataset object into array of objects:
    let dataset = [];
    for (let key in timeSeries) {
      dataset.push(timeSeries[key]);
    }
    console.log("Dataset in chart.js: ", dataset);

    //STOCKS STRUCTURE EXAMPLE:
    // stocks: {
    //   'Meta Data': {
    //     '1. Information': 'Intraday (5min) open, high, low, close prices and volume',
    //     '2. Symbol': 'VLO',
    //     '3. Last Refreshed': '2020-03-02 16:00:00',
    //     '4. Interval': '5min',
    //     '5. Output Size': 'Compact',
    //     '6. Time Zone': 'US/Eastern'
    //   },
    //   'Time Series (5min)': {
    //     '2020-03-02 16:00:00': {
    //       '1. open': '67.9900',
    //       '2. high': '68.0600',
    //       '3. low': '67.7400',
    //       '4. close': '67.9100',
    //       '5. volume': '256388'
    //     },
    //     '2020-03-02 16:00:00': {
    //       '1. open': '67.9900',
    //       '2. high': '68.0600',
    //       '3. low': '67.7400',
    //       '4. close': '67.9100',
    //       '5. volume': '256388'
    //     },


      d3.json(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.props.ticker}&interval=5min&apikey=MUKS5PNHTEUS1KM2`, function (data) {
        console.log("Data in D3.json: ", data)
      });

    //DEFINE SCALES:
    const xScale = d3.scaleLinear();



    // async function getDataset(ticker) {
    //   const dataset = await d3.json(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=MUKS5PNHTEUS1KM2`);
    //   //{this.props.ticker}
    //   console.log('dataset: ', Array.isArray(dataset['Time Series (5min)']));
    // }
    // getDataset(this.props.ticker);



    const width = 600;
    const height = 600;
    const fill = 'green';
    //Should select the div with id='chart' provided by the parent singleStock component
    const svg = d3.select('body') //was 'chart'
      .append('svg')
      .attr("width", width)
      .attr('height', height)
      .attr('fill', fill);

    svg.append('rect')
      .attr('width', 40)
      .attr('height', 40)
      .attr('fill', 'yellow')

    return svg;
    }
    //Create a fork render depending on whether the state is loaded?
    render() {
      return <div id="chart">
        <h3>The Single Stock Chart below is for: {this.props.ticker}</h3>
      </div>
    }

}

//Both mapStateToProps and mapDispatchToProps return objects
function mapStateToProps(state) {
  console.log('State in mapStateToProps: ', state.stocks['Meta Data'])
  return {
    stocks: state.stocks,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    //returns a function that, when called, dispatches a thunk:
    getStock: function(ticker) {
      dispatch(getStockThunk(ticker))
    //getStock: ticker => dispatch(getStockThunk(ticker))
    }
  }
}

const Chart = connect(mapStateToProps, mapDispatchToProps)(disconnectedChart);
export default Chart;
