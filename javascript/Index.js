'use strict';

window.onload = function(){
   // TODO: directed vs undirected
   var graphCreator = new GraphCreator();

   var radius = 32;

   var svg = d3.select("#canvasSVG")
   	.on("click", clearSelection);


   var circles = [];

   var color = d3.scaleOrdinal()
   .range(d3.schemeCategory20);
   var selectedNode = null;

   //turn virtual circles into visual representation
   svg.selectAll("circle")
   .data(circles)
   .enter().append("circle")
   .attr("cx", function(d) { return d.x; })
   .attr("cy", function(d) { return d.y; })
   .attr("r", radius)
   .style("fill", function(d, i) { return color(i); })
   .on("click", clicked)
   .call(d3.drag()
   //.on("start", dragstarted)
   .on("drag", dragged));
   //.on("end", dragended));


   //create circles on new click
   svg.on("dblclick",function() {
      var coords = d3.mouse(this);
      var newData= {
         x: Math.round( coords[0]),  // Takes the pixel number to convert to number
         y: Math.round( coords[1]),
         id: graphCreator.getNextID()
      };
      circles.push(newData);
      if (selectedNode != null) {
      	console.log("clearing selection");
   		d3.select(selectedNode).classed("active", false);
      }
      selectedNode = null;
      console.log("Circle created, selectedNode reset");

      svg.selectAll("circle")
      .data(circles)
      .enter().append("circle")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", radius)
      .style("fill", function(d, i) { return color(i); })
      .on("click", clicked)
      .call(d3.drag()
      	.on("drag", dragged)
      );

   });

   function clicked(d) {
   	if (selectedNode == null) { // no selection
   		d3.select(this).raise().classed("active",true);
   		selectedNode = this;
   		console.log("Circle ", d.id, " selected");
   	} else {
   		console.log("clearing selection");
   		d3.select(selectedNode).classed("active", false);
   		d3.select(this).raise().classed("active",true);
   		selectedNode = this;
   		console.log("Circle ", d.id, " selected");
   	}
   }

   function clearSelection(d) {
   	/*if (selectedNode != null) {
   		console.log("clearing selection");
   		d3.select(selectedNode).classed("active", false);
   	}*/
   	if (this.id == "canvasSVG" && selectedNode != null) {
   		console.log("clearing selection");
   		d3.select(selectedNode).classed("active", false);
   	}
   	//console.log(d.id);
   }

   function dragstarted(d) {
      d3.select(this).raise().classed("active", true);
   }

   function dragged(d) {
   	if (selectedNode != null) return;
      d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
   }

   function dragended(d) {
      d.x = this.getAttribute("cx");
      d.y = this.getAttribute("cy");
      console.log("Circle ", d.id, " moved to (", d.x, ",", d.y, ")");
      d3.select(this).classed("active", false);
   }

}
