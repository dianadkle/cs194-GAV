'use strict';


window.onload = function(){

   var jsonCircles = [
      { "cx": 50, "cy": 90, "radius": 50, "color" : "green" },
      { "cx": 100, "cy": 40, "radius": 20, "color" : "purple" },
      { "cx": 150, "cy": 70, "radius": 40, "color" : "red" }];

   var max = d3.max(jsonCircles.map(function(c){return c.cx + c.radius;}));
   var min = d3.min(jsonCircles.map(function(c){return c.cx + c.radius;}))
   var linearScale = d3.scaleLinear()
                        .domain([min, max])
                        .range([0, 200]);

   var svgContainer = d3.select("body").append("svg")
                        .attr("width", 800 + 20)
                        .attr("height", 600 + 20);

   var circleGroup = svgContainer.append("g")
                        .attr("transform", "translate(0, 0)");

   var circles = circleGroup.selectAll("circle")
      .data(jsonCircles)
      .enter()
      .append("circle");

   var circleAttributes = circles
      .attr("cx", function(c){ return c.cx; })
      .attr("cy", function(c){ return c.cy; })
      .attr("r", function(c){ return c.radius; })
      .style("fill", function(c){ return c.color; });

   var text = svgContainer.selectAll("text")
                           .data(jsonCircles)
                           .enter()
                           .append("text");

   var textLabels = text.attr("x", function(d){return d.cx; })
                        .attr("y", function(d){return d.cy; })
                        .text(function(d){return "( " + d.cx + ", " + d.cy +" )";})
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "10px")
                        .attr("fill", "black");

   var axisScale = d3.scaleLinear().domain([0, 100]).range([0, 400]);
   var xAxis = d3.axisRight(axisScale);
   svgContainer.append("g").call(xAxis);
};
