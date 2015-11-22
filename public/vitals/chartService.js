angular.module('didacticMeowApp').service('chartService', function(vitalsService, firebase){
  //initialize the chart
  this.InitChart = function(array){
    console.log(array);
    //transform the array of objects into a format that is readable by D3
    var arr = array.map(function(obj){
      var newObj = {};
      newObj['y'] = obj.reading;
      newObj['x'] = new Date(obj.time);
      return newObj;
    });
    console.log(arr);
    //pass this tranformed array of objects as the lineData
    var lineData = arr;
    //select the svg element to be passed the visualization elements
    var vis = d3.select("#visualisation"),
      //these are the attributes of the generated svg
      WIDTH = 1000,
      HEIGHT = 500,
      MARGINS = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
      },
      //generate the ranges from the passed data
      xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(lineData, function (d) {
          return d.x;
        }),
        d3.max(lineData, function (d) {
          return d.x;
        })
      ]),
      yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(lineData, function (d) {
          return d.y;
        }),
        d3.max(lineData, function (d) {
          return d.y;
        })
      ]),
      //generate the axes from the calculated ranges
      xAxis = d3.svg.axis()
        .scale(xRange)
        .tickSize(5)
        .tickSubdivide(true),
      yAxis = d3.svg.axis()
        .scale(yRange)
        .tickSize(5)
        .orient("left")
        .tickSubdivide(true);
    //start appending SVG shapes, this is the background
    vis.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "white");
    //this is the x axis
    vis.append("svg:g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
      .call(xAxis);
    //this is the y axis
    vis.append("svg:g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + (MARGINS.left) + ",0)")
      .call(yAxis);
    //calculate the lines!
    var lineFunc = d3.svg.line()
    .x(function (d) {
      return xRange(d.x);
    })
    .y(function (d) {
      return yRange(d.y);
    })
    .interpolate('linear');
  //add the lines!
  vis.append("svg:path")
    .attr("d", lineFunc(lineData))
    .attr("stroke", "#4f6367")
    .attr("stroke-width", 2)
    .attr("fill", "none");

  }
})
