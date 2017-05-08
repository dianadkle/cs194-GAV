'use strict';

function CanvasModifier(/* TODO: add arguments for CanvasModifier info */){
    // this.args = args;
}


/*
 * Example method for a CanvasModifier object
 *
CanvasModifier.prototype.changeSomethingAboutCanvasModifier = function(args){
   //this.something = something;
   //return some new info?
}; */


'use strict';

window.onload = function(){

   var data = [ "oh", "my", "gosh" ];

   var bodySelection = d3.select("body");


   // var svgSelection = bodySelection.append("svg")
   //    .attr("width", 200)
   //    .attr("height", 200);
   // var circleSelection = svgSelection.append("circle")
   //    .attr("cx", 25)
   //    .attr("cy", 25)
   //    .attr("r", 25)
   //    .style("fill", "purple");

   var jsonCircles = [
      {"x_axis": 30, "y_axis": 30, "radius": 20, "color":"green"},
      {"x_axis": 70, "y_axis": 70, "radius": 20, "color":"purple"},
      {"x_axis": 110, "y_axis": 110, "radius": 20, "color":"red"}
   ];

   var svgContainer = d3.select("body").append("svg")
      .attr("width", 200)
      .attr("height", 200)
      .style("border", "1px solid black");


   //could change this to node ends,have lineGraph parse lineData not jsonCircles
   var lineFunction = d3.line()
                     .x(function(d){return d.x_axis; })
                     .y(function(d){return d.y_axis; });

   var lineGraph = svgContainer.append("path")
                  .attr("d", lineFunction(jsonCircles))
                  .attr("stroke", "blue")
                  .attr("stroke-width", 2)
                  .attr("fill", "none");

   var circles = svgContainer.selectAll("circle")
      .data(jsonCircles)
      .enter()
      .append("circle");

   var circleAttributes = circles
      .attr("cx", function(d){ return d.x_axis; })
      .attr("cy", function(d){ return d.y_axis; })
      .attr("r", function(d){ return d.radius; })
      .style("fill", function(d){ return d.color; });

   var inputBox = bodySelection.append("div")
      .append("input")
      .attr("type", "button")
      .attr("value", "Add Node")
      .attr("id", "addNodeButton");


      // var p = d3.select("body").selectAll("p")
      //    .data(data)
      //    .enter()
      //    .append("p").text(function(d, i){return (i + 1) + ': ' +  d + '!';});

      //var ohData = p._groups[0][0/1/2].__data__;


   var addNodeButton = document.getElementById('addNodeButton');
   addNodeButton.addEventListener("click", function(){
      window.alert('This is an example of how to add events');
   });
};
