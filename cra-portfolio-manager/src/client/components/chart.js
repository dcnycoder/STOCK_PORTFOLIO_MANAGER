import React, { Component } from 'react';
import {getStockThunk} from '../store/';
import {connect} from 'react-redux'
const d3 = require('d3');
const fc = require('d3fc');
//const techan = require('techan-js');

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
    if (this.props.stocks) this.buildChart();
  }

  buildChart() {
    // //get the data from the state:
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

    //GET DATA FROM STATE AND CONVERT IT INTO AN ARRAY:
    let timeSeries = this.props.stocks['Time Series (5min)'];

    const width = 1600;
    const height = 1600;
    const margin = 30;
    const fill = 'green';

    // Convert dataset object into array of objects:
    // and parse time with d3.timeParse("%y-%m-%d"). This gives D3 the current data template: 2020-03-02 16:00:00, values separated by - and : and how to interpret each value. Sort of like a regular expression. To convert data object back to string format, use D3.timeFormat.

    var parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S")
    // price: {
    //       '1. open': '67.9900',
    //       '2. high': '68.0600',
    //       '3. low': '67.7400',
    //       '4. close': '67.9100',
    //       '5. volume': '256388'
    //     },

    let dataset = [];
    //var dataset = fc.randomFinancial()(50);
    //FORMAT DATASET:
    for (let key in timeSeries) {
      let object = {}
      //2020-03-02 16:00:00
      object.date = d3.timeParse("%Y-%m-%d %H:%M:%S")(key);
      //rename key names:
      for (let key1 in timeSeries[key]) {
        object[key1.slice(3)]= Number(timeSeries[key][key1])
      }
      dataset.push(object)
    }
    console.log("Dataset: ", dataset)

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


      // d3.json(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.props.ticker}&interval=5min&apikey=MUKS5PNHTEUS1KM2`, function (data) {
      //   console.log("Data in D3.json: ", data)
      // });

    //DEFINE SCALES:
    //PROTOTYPE:
    // .domain([
    //   d3.min(dataset, accessor function)
    //   d3.max(dataset, accessor function)
    // ])
    // OR
    // CAN DO THE SAME WITH D3.extent(iterable[, accessor]) function, that returns the min and max of the iterable provided to it. D3.extent returns an array of [min, max]

      //WAY TO CHECK THE SCALE .domain and .range properties
      // console.log(yScale.domain());
      // console.log(yScale.range());
      // console.log(`yScale(33) ${yScale(66)}`);

    // async function getDataset(ticker) {
    //   const dataset = await d3.json(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=MUKS5PNHTEUS1KM2`);
    //   //{this.props.ticker}
    //   console.log('dataset: ', Array.isArray(dataset['Time Series (5min)']));
    // }
    // getDataset(this.props.ticker);


    //Should select the div with id='chart' provided by the parent singleStock component
    //OLD D3 WAY:
    // const svg = d3.select('#chart')
      // .append('svg')
      // .attr("width", width)
      // .attr('height', height)
      // .attr('fill', fill);

    // svg.append('rect')
    //   .attr('width', 40)
    //   .attr('height', 40)
    //   .attr('fill', 'yellow')

    // return svg;
    // }

    // NEW D3FC WAY:
    //The line series component renders an SVG line, with the mainValue / crossValue properties defining accessors on the underlying data

    //.data(dataset) ?
    //UNCOMMMENT!
    // const lineSeries = fc
    //   .seriesSvgLine()
    //   .mainValue(d=>d.high)
    //   .crossValue(d=>d.date)

    // const chart = fc
    //   .chartCartesian(xScale, yScale)
    //   .yOrient("right")
    //   .yDomain(yScale.domain)
    //   .xDomain(xScale.domain)
    //   .svgPlotArea(lineSeries)

    // svg
    //   .datum(dataset)
    //   .call(chart)

//NOTES: d3.Extent SILENTLY FAILS!
    const xExtent = fc.extentDate()
    .accessors([d =>
    {
      return d.date
    }]
    );
  const yExtent = fc.extentLinear()
    .pad([0.1, 0.1])
    .accessors([d =>
      {
        return d.high
      }, d =>
      {
        return d.low;
      }]);


    // The accessorFunc(datum, index) function is called on each item of the data, returning the relevant value for the given accessor.

    //Candlestick chart example: https://d3fc.io/introduction/getting-started.html
    let gridlines = fc.annotationSvgGridline();
    let candlestick = fc.seriesSvgCandlestick();
    let multi = fc.seriesSvgMulti()
      .series([gridlines, candlestick]);

    let chart = fc.chartCartesian(
      fc.scaleDiscontinuous(d3.scaleTime()),
      d3.scaleLinear()
    )
      .yDomain(yExtent(dataset))
      .xDomain(xExtent(dataset))
      .svgPlotArea(multi);

    console.log("xExtent(dataset): ", xExtent(dataset));

    console.log("yExtent(dataset): ", yExtent(dataset));

  //TEST CARTESIAN CHART:
//   var gridlines = fc.annotationSvgGridline();
// // series (from d3fc-series)
// // n.b. the series are rendered using canvas
// var line = fc.seriesCanvasLine();
// // var area = fc.seriesCanvasArea()
// //   .mainValue(d => d.z);

// // combine into a single series
// var multi = fc.seriesCanvasMulti()
//   .series([line]);

// // the Cartesian component, which uses d3fc-element for layout
// // of the standard features of a chart (axes, labels, plot area)
// var chart = fc.chartCartesian(
//     d3.scaleTime(),
//     d3.scaleLinear()
//   )
//   // .xLabel('Value')
//   // .yLabel('Sine / Cosine')
//   // .chartLabel('Sine and Cosine')
//   .yDomain(yExtent(dataset))
//   .xDomain(xExtent(dataset))
//   .svgPlotArea(gridlines)
//   .canvasPlotArea(multi);

  d3.select('#chart')
    //.datum(data) //dummy
    .datum(dataset)
    .call(chart);


  }// END OF BUILDCHART FUNCTION
  //   //Create a fork render depending on whether the state is loaded?
    render() {
      return <div>
        <h3>The Single Stock Chart below is for: {this.props.ticker}</h3>
      </div>
    }

} //END OF CHART CLASS COMPONENT

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
