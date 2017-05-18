'use strict';


// var canvasWidth = document.getElementById('canvasRow').offsetWidth,
//    canvasHeight = document.getElementById('canvasRow').offsetHeight;
   var circlesArr = [
      {x:20, y:300, id: 1000, value: 1000, sources: [], targets: []},
      {x:600, y:200, id: 1001, value: 1001, sources: [], targets: [1005, 1007]},
      {x:400, y:100, id: 1002, value: 1002, sources: [1004], targets: [1009]},
      {x:200, y:500, id: 1003, value: 1003, sources: [1005, 1006], targets: []},
      {x:300, y:400, id: 1004, value: 1004, sources: [1005], targets: [1002]},
      {x:450, y:250, id: 1005, value: 1005, sources: [1001], targets: [1003, 1004, 1011]},
      {x:40, y:350, id: 1006, value: 1006, sources: [1001], targets: [1003]},
      {x:220, y:450, id: 1007, value: 1007, sources: [1001, 1008, 1010], targets: [1006]},
      {x:140, y:550, id: 1008, value: 1008, sources: [], targets: [1007]},
      {x:700, y:50, id: 1009, value: 1009, sources: [1002, 1012], targets: [1011]},
      {x:600, y:150, id: 1010, value: 1010, sources: [], targets: [1007]},
      {x:360, y:200, id: 1011, value: 1011, sources: [1005, 1009], targets: []},
      {x:100, y:320, id: 1012, value: 1012, sources: [], targets: [1009]}
   ];

   var edgesArr = [
      {source: 1002, target: 1009},
      {source: 1010, target: 1007},
      {source: 1001, target: 1007},
      {source: 1001, target: 1005},
      {source: 1007, target: 1006},
      {source: 1004, target: 1002},
      {source: 1006, target: 1003},
      {source: 1005, target: 1004},
      {source: 1012, target: 1009},
      {source: 1008, target: 1007},
      {source: 1005, target: 1003},
      {source: 1005, target: 1011},
      {source: 1009, target: 1011},
   ];
var radius = 32;

window.onload = function(){
   var graphCreator = new GraphCreator();
   var nodeSelected = false, selectedNode = null, selectedTag = null;
   var clickWasOnNode = false, dbClickOnNode = false, draggedNode = null;

   var svg = d3.select("#canvasSVG").on("click", clickedOnSVG);

   var nodesGroup = svg.append("g").attr("class", "nodes");
   var edgesGroup = svg.append("g").attr("class", "edges");

   var idCount = 0;

   var width = document.getElementById('canvasRow').offsetWidth,
       height = document.getElementById('canvasRow').offsetHeight;

   //add edges
   var edges = edgesGroup.selectAll("g")
               .data(edgesArr)
               .enter().append('line')
               .attr("class", "line")
               .attr("x1", function(d) { var node = circlesArr.find(n => n.id === d.source);return node.x; })
               .attr("y1", function(d) { var node = circlesArr.find(n => n.id === d.source);return node.y; })
               .attr("x2", function(d) { var node = circlesArr.find(n => n.id === d.target);return node.x; })
               .attr("y2", function(d) { var node = circlesArr.find(n => n.id === d.target);return node.y; })
               .style("stroke","#000000")
               .style("pointer-events", "none");

   //add nodes with text, like <g> <circle/> <text> </g>
   var nodes = nodesGroup.selectAll("g")
               .data(circlesArr)
               .enter().append("g")
               .on("mousedown", mouseDownOnNode)
               .on("click", clickedOnNode)
               .on("dbclick", dbClickedOnNode)
               .raise().classed("dormant", true)
               .call(d3.drag()
                   .on("drag", dragged)
                   .on("end", dragEndedMouseUp)
                );

   nodes.append("circle")
               .attr("cx", function(d) { return d.x; })
               .attr("cy", function(d) { return d.y; })
               .attr("r", radius)
               .style("fill", "#dbdb8d");

   nodes.append("text")
              .attr("x", function(d){return d.x - radius / 2;})
              .attr("y", function(d){return d.y + radius / 8;})
              .attr("class", "nodelabel")
              .attr("stroke","black")
              .text(function(d){return d.id;});

   //create circles on double click
   svg.on("dblclick",function() {
      if(dbClickOnNode){
         dbClickOnNode = false;
         return;
      }

      if(nodeSelected) return;
      //create circle
      var coords = d3.mouse(this);
      var newData= {
         x: Math.round( coords[0]),  // Takes the pixel number to convert to number
         y: Math.round( coords[1]),
         id: graphCreator.addNode('test_value', idCount++, 'yellow'),
         value: "new_value"
      };
      circlesArr.push(newData);
   });


   /***************** event handling functions *****************/

   function mouseDownOnNode(){
      nodeSelected = true;
   }

   function clickedOnNode(d) {
      clickWasOnNode = true;

      //no other node clicked, outline node
      if(selectedNode === null){
         selectedNode = d;
         selectedTag = this;
         toggleCircle();
      } else if (selectedNode !== d){

         edgesArr.push({source: selectedNode.id, target: d.id});
         selectedNode = null;
         nodeSelected = false;
         //renderLines();
         //renderCircles();
         //renderLabels();
         toggleCircle();
      } else {
         unselectNode();
      }
   }

   function clickedOnSVG(d) {
      if(clickWasOnNode){
         //don't do anything here if the click was on a node
         //let the clickedOnNode function handle that, reset clickWasOnNode
         clickWasOnNode = false;

      } else if (nodeSelected){
         //if clicked outside of node while it was selected, deselect it
         unselectNode();
      }
      //else click was just on svg
      //no nodes had been selected, do nothing
   }

   function dbClickedOnNode(d){
      //this prevents new node from being created on db click
      dbClickOnNode = true;
   }

   function unselectNode(){
      selectedNode = null;
      nodeSelected = false;
      toggleCircle();
   }


   function dragged(d) {
      d3.select(this).selectAll("circle").attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
      d3.select(this).selectAll("text").attr("x", d.x - radius / 2).attr("y", d.y + radius / 8);
      //TODO: update edge
   }

   function dragEndedMouseUp(d) {

      if(draggedNode !== null){
         draggedNode.x = d3.event.x;
         draggedNode.y = d3.event.y;
         draggedNode = null;
      }
   }

   function ticked(){
     nodes.attr("cx", function(d){ return d.x;})
         .attr("cy", function(d){ return d.y;})
   }


   function toggleCircle(){
      if(nodeSelected){
            d3.select(selectedTag).raise().classed("active", true);
            d3.select(selectedTag).raise().classed("dormant", false);
      } else {
            d3.select(selectedTag).raise().classed("active", false);
            d3.select(selectedTag).raise().classed("dormant", true);
      }
   }
}
