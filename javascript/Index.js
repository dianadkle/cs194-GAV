'use strict';

window.onload = function(){
   var graphCreator = new GraphCreator();
   graphCreator.helloWorld();

   var radius = 32;

   var svg = d3.select("#canvasSVG");


var circles = [];

var color = d3.scaleOrdinal()
    .range(d3.schemeCategory20);

svg.selectAll("circle")
  .data(circles)
  .enter().append("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", radius)
    .style("fill", function(d, i) { return color(i); })
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

svg.on("click",function() {
	var coords = d3.mouse(this);
	var newData= {
            x: Math.round( coords[0]),  // Takes the pixel number to convert to number
            y: Math.round( coords[1])
          };
    circles.push(newData);

    svg.selectAll("circle")
  .data(circles)
  .enter().append("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", radius)
    .style("fill", function(d, i) { return color(i); })
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
})

function dragstarted(d) {
  d3.select(this).raise().classed("active", true);
}

function dragged(d) {
  d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

function dragended(d) {
  d3.select(this).classed("active", false);
}

}
