 //   NEW: 
            var width = 500;
            var height = 250;
            var container = d3.select('#chart')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('fill', 'yellow');

        // create the scales
        var xScale = d3.scalePoint()
            .domain(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
            .range([0, width])
            .padding(0.5);

        var yScale = d3.scaleLinear()
            .domain([0, 10])
            .range([height, 0]);

        // create a series
        var series = fc.seriesSvgBar()
            .bandwidth(40)
            .crossValue(function(d) { return d.month; })
            .mainValue(function(d) { return d.sales; })
            .xScale(xScale)
            .yScale(yScale);

        // render
        container
            .datum(data)
            .call(series);