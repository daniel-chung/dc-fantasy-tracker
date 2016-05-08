// /public/ng-app/services/statschart/statschart-factory.js

angular.module('fbs.statschart', [])
  .service('statschartFactory', function($http) {
    this.drawChart = function(data, chartid, statname) {

      var statTranslation = {
        "r": "Runs",
        "hr": "Home Runs",
        "rbi": "Runs Batted In",
        "sb": "Stolen Bases",
        "obp": "On Base Percentage"
      }

      var w = 500;
      var h = 300;
      var m = {
        top: 40,
        right: 50,
        bottom: 40,
        left: 50
      };

      d3.selectAll("svg").remove();

      var svg = d3.select(chartid)
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);

      var xRange = d3.scale.linear()
                    .range([m.left, w - m.right])
                    .domain([
                      d3.min(data, function(d) { return d.age; }),
                      d3.max(data, function(d) { return d.age; })
                    ]);

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

      var yRange = d3.scale.linear()
                    .range([h - m.top, m.bottom])
                    .domain(yRangeBound);
      var xAxis = d3.svg.axis()
                    .scale(xRange)
                    .ticks(data.length)
                    .tickSize(1);
      var yAxis = d3.svg.axis()
                    .scale(yRange)
                    .tickSize(1)
                    .orient('left');

      var lineFunc = d3.svg.line()
                      .defined(function(d) { return !isNaN(d.stat); })
                      .x(function(d) { return xRange(d.age); })
                      .y(function(d) { return yRange(d.stat); })
                      .interpolate('linear');

      var lineFuncComp = d3.svg.line()
                      .defined(function(d) { return !isNaN(d.statcomp); })
                      .x(function(d) { return xRange(d.age); })
                      .y(function(d) { return yRange(d.statcomp); })
                      .interpolate('linear');

      svg.append('g')
        .attr('transform', 'translate(0,' + (h - m.bottom) + ')')
        .call(xAxis);

      svg.append('g')
        .attr('transform', 'translate(' + (m.left) + ',0)')
        .call(yAxis);

      svg.append('path')
        .attr('d', lineFunc(data))
        .attr('stroke', '#0A350A')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

      // Add comparison line
      if (data[0].hasOwnProperty('statcomp')) {
        svg.append('path')
          .attr("class", "line")
          .attr('d', lineFuncComp(data))
          .attr('stroke', '#913C05')
          .attr('stroke-width', 2)
          .attr('fill', 'none');
      }

      svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "translate("+ (m.left/4) +","+ (m.top) +") rotate(-90)")
        .text(statTranslation[statname]);

      svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "translate("+ (w-m.right) +","+ (h - m.bottom/4) +")")
        .text("age");


    };

  });


// EOF -------------------------------------------------------------------------
