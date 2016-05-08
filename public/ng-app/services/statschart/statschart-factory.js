// /public/ng-app/services/statschart/statschart-factory.js

angular.module('fbt.statschart', [])
  .service('statschartFactory', function($http) {
    this.drawChart = function(data, chartid, statname) {

      // Converts terse column names to meaningful labels
      var statTranslation = {
        "r": "Runs",
        "hr": "Home Runs",
        "rbi": "Runs Batted In",
        "sb": "Stolen Bases",
        "obp": "On Base Percentage"
      }

      // Set up some basic configuration for the SVG element
      var w = 600;
      var h = 300;
      var m = {
        top: 40,
        right: 50,
        bottom: 40,
        left: 50
      };

      // Clear any previous visualizations so things don't stack up
      d3.selectAll("svg").remove();

      // Create the SVG object to add data visualiation
      var svg = d3.select(chartid)
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);

      // Create a scale function that automatically scales our x-axis values to
      // fit into our SVG object
      var xRange = d3.scale.linear()
                    .range([m.left, w - m.right])
                    .domain([
                      d3.min(data, function(d) { return d.age; }),
                      d3.max(data, function(d) { return d.age; })
                    ]);

      // Helper fuction that determins the correct min and max values
      // Depending on if we have one or two serieses
      var yRangeBound = (data[0].hasOwnProperty('statcomp')) ?
        [
          Math.min(
            d3.min(data, function(d) { return d.statcomp; }),
            d3.min(data, function(d) { return d.stat; })
          ),
          Math.max(
            d3.max(data, function(d) { return d.statcomp; }),
            d3.max(data, function(d) { return d.stat; })
          )
        ] :
        [
          d3.min(data, function(d) { return d.stat; }),
          d3.max(data, function(d) { return d.stat; })
        ];

      // Takes the above bound values and creates a scale to map our y-axis
      // values to our SVG height
      var yRange = d3.scale.linear()
                    .range([h - m.top, m.bottom])
                    .domain(yRangeBound);

      // Configures the x-axis line with value labels
      var xAxis = d3.svg.axis()
                    .scale(xRange)
                    .ticks(data.length)
                    .tickSize(1);

      // Configures the y-axis line with value labels
      var yAxis = d3.svg.axis()
                    .scale(yRange)
                    .tickSize(1)
                    .orient('left');

      // Create a function to help us plot a line to our SVG object
      var lineFunc = d3.svg.line()
                      .defined(function(d) { return !isNaN(d.stat); })
                      .x(function(d) { return xRange(d.age); })
                      .y(function(d) { return yRange(d.stat); })
                      .interpolate('linear');

      // Create a function to help us plot a line to our SVG object for
      // our comparison line
      var lineFuncComp = d3.svg.line()
                      .defined(function(d) { return !isNaN(d.statcomp); })
                      .x(function(d) { return xRange(d.age); })
                      .y(function(d) { return yRange(d.statcomp); })
                      .interpolate('linear');

      // Plots the x-axis
      svg.append('g')
        .attr('transform', 'translate(0,' + (h - m.bottom) + ')')
        .call(xAxis);

      // Plots the y-axis
      svg.append('g')
        .attr('transform', 'translate(' + (m.left) + ',0)')
        .call(yAxis);

      // Plot the current player's statistics
      svg.append('path')
        .attr('d', lineFunc(data))
        .attr('stroke', '#0A350A')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

      // Add the comparison line
      if (data[0].hasOwnProperty('statcomp')) {
        svg.append('path')
          .attr("class", "line")
          .attr('d', lineFuncComp(data))
          .attr('stroke', '#913C05')
          .attr('stroke-width', 2)
          .attr('fill', 'none');
      }

      // Add a y-axis label
      svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "translate("+ (m.left/4) +","+ (m.top) +") rotate(-90)")
        .text(statTranslation[statname]);

      // Add a x-axis label
      svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "translate("+ (w-m.right) +","+ (h - m.bottom/4) +")")
        .text("age");
    };

  });


// EOF -------------------------------------------------------------------------
