'use strict';

var GraphCreator = require('./GraphCreator');

/***********************************Index.js***********************************/


var nodes = [
   {x:20, y:300, id: 0, value: "Arlene", weight: 2, color: "yellow"},
   {x:600, y:200, id: 1, value: "Brett", weight: 5, color: "yellow"},
   {x:400, y:100, id: 2, value: "Cindy", weight: 3, color: "yellow"},
   {x:200, y:500, id: 3, value: "Dennis", weight: 6, color: "yellow"},
   {x:300, y:400, id: 4, value: "Emily", weight: 4, color: "yellow"},
   {x:450, y:250, id: 5, value: "Frank", weight: 1, color: "yellow"},
   {x:40, y:350, id: 6, value: "Gilbert", weight: 7, color: "yellow"},
   {x:220, y:450, id: 7, value: "Harvey", weight: 9, color: "yellow"},
   {x:140, y:550, id: 8, value: "Irene", weight: 8, color: "yellow"},
   {x:700, y:50, id: 9, value: "Jose", weight: 11, color: "yellow"},
   {x:600, y:150, id: 10, value: "Katrina", weight: 12, color: "yellow"},
   {x:360, y:200, id: 11, value: "Lee", weight: 10, color: "yellow"},
   {x:100, y:320, id: 12, value: "Maria", weight: 13, color: "yellow"}
];

var links = [
   {source: 2, target: 9},
   {source: 0, target: 7},
   {source: 1, target: 7},
   {source: 1, target: 5},
   {source: 7, target: 6},
   {source: 4, target: 2},
   {source: 6, target: 3},
   {source: 5, target: 4},
   {source: 2, target: 9},
   {source: 8, target: 7},
   {source: 5, target: 3},
   {source: 5, target: 1},
   {source: 9, target: 3},
   {source: 0, target: 2}
];

var algorithms = [
   "Depth-First Search",
   "Breadth-First Search",
   "Dijkstra's Algorithm"
];

var radius = 20;

window.onload = function(){
   var selectedNode = null, selectedTag = null;
   var clickWasOnNode = false, dblClickWasOnNode = false;
   var directed = false;

   var svg = d3.select("#canvasSVG")
      .on("click", clickedOnSVG)
      .on("dblclick", dblClickedOnSVG);

   var idCount = 0;

   var width = document.getElementById('canvasRow').offsetWidth,
      height = document.getElementById('canvasRow').offsetHeight;


   //force simulation
   var simulation = d3.forceSimulation()
   .force("link", d3.forceLink().distance(radius * 5).id(function(d) { return d.id; }))
   .force("charge", d3.forceManyBody().strength(-10))
   .force("center", d3.forceCenter(width / 2, height / 2));

   //node and link svg data
   var node = null, link = null;

   var graphCreator = new GraphCreator(false);

   importData();
   initializeAlgorithmButtons();

   updateCanvas();

   /************* called every time the canvas needs to be updated *************/
   function updateCanvas() {

      //clear SVG
      svg.selectAll("*").remove();

      //links consist of lines, classed "link"
      link = svg.selectAll("link").data(links, function(d) { return d.target.id; })
      link = link.enter().append("line").attr("class", "link");

      //nodes are bound with nodes from the nodes array
      node = svg.selectAll("node").data(nodes, function(d) { return d.id; });

      //node consists of circle and text
      node = node.enter().append("g")
      .on("click", clickedOnNode)
      .on("dblClick", dblClickedOnNode)
      .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

      //create node
      node.append("circle")
      .attr("r", radius)
      .attr("class", "nodeCircle")
      .raise().classed("dormant", true)
      .raise().classed("nodeYellow", function(d){return d.color === "yellow"})
      .raise().classed("nodeGreen", function(d){return d.color === "green"})
      .raise().classed("nodeRed", function(d){return d.color === "red"});

      //apply hover-over text to node
      node.append("title").text(function(d) { return d.id; });

      //apply text to node
      node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", radius / 4)
      .attr("class", "nodeText")
      .text(function(d) { return d.value; });

      //configure nodes to move on "ticks", configure links to simulation links
      simulation.nodes(nodes).on("tick", ticked);
      simulation.force("link").links(links);
   }


   /****************************** event handlers ******************************/

   /* logic for handling node clicks */
   function clickedOnNode(d) {

      //event propagation control
      clickWasOnNode = true;

      //no other node clicked, outline node
      if(selectedNode === null){
         selectNode(d, this);
      } else {
         if (selectedNode !== d){
            //clicked on a different node while another was selected, generate edge
            addLink(selectedNode.id, d.id);
            updateCanvas();
         }
         deselectNode();
      }
   }

   /* adds a new edge between two nodes */
   function addLink(sourceID, targetID){
      var edges = links.find(link => link.source.id === sourceID && link.target.id === targetID);
      if(!directed && edges === undefined){
         edges = links.find(link => link.source.id === targetID && link.target.id === sourceID);
         //TODO: update edges for direction
      }
      if(edges === undefined){
         links.push({source: sourceID, target: targetID});
         graphCreator.addEdge(sourceID, targetID);
      }
   }

   /* update state variables to prevent new nodes from being created on db click*/
   function dblClickedOnNode(d){
      dblClickWasOnNode = true;
      //TODO: prompt for new value
   }

   /*high level logic for handling SVG clicks*/
   function clickedOnSVG(d) {
      if(clickWasOnNode){
         //deactivate clickWasOnNode and let clickedOnNode function handle the rest
         clickWasOnNode = false;
      } else if (selectedNode !== null){
         //clicked outside node while selected, deselect it
         deselectNode();
      }
      //else click was just on svg, do nothing
   }

   /* generate new node */
   function dblClickedOnSVG() {
      if(dblClickWasOnNode){
         dblClickWasOnNode = false;
         return;
      }

      if(selectedNode !== null) return;

      var valuePromptStr = "Please enter your node's value. ";
         valuePromptStr += "\nThis could be a number, name, etc.";
      var weightPromptStr = "Please enter your node's weight. ";
         weightPromptStr += "\nSet this to 0 if your graph doesn't consider node weights.";

      var value = prompt(valuePromptStr);
      if (value === null) return;

      var weight = prompt(weightPromptStr);
      if (weight === null) return;

      //create circle
      var coords = d3.mouse(this);
      var newNodeObj = graphCreator.addNode(value, weight, "yellow");
      var newNode= {
         x: Math.round( coords[0]),  // Takes the pixel number to convert to number
         y: Math.round( coords[1]),
         value: value,
         weight: weight,
         color: "yellow",
         id: graphCreator.addNode(value, weight, "yellow").id
      };
      nodes.push(newNode);
      updateCanvas();
   }

   /** updating function, called every time canvas needs to be updated**/
   function ticked() {
      link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

      node
      .attr("transform", function(d) { return "translate(" + d.x + ", " + d.y + ")"; });
   }

   function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart()
   }

   function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
   }

   function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0.5);
      d.fx = undefined;
      d.fy = undefined;
   }


   function selectNode(d, nodeTag){
      selectedNode = d;
      selectedTag = nodeTag;
      toggleNode();
   }

   function deselectNode(){
      selectedNode = null;
      toggleNode();
   }

   function toggleNode(){
      var circleTag = d3.select(selectedTag).select("circle");
      var textTag = d3.select(selectedTag).select("text");
      if(selectedNode !== null){
         circleTag.raise().classed("active", true);
         circleTag.raise().classed("dormant", false);
      } else {
         circleTag.raise().classed("active", false);
         circleTag.raise().classed("dormant", true);
      }
      textTag.raise().classed("nodeText", true);
   }


   /*loads test/imported data to graphCreator*/
   function importData(){
      nodes.forEach(function(node){
         graphCreator.addNode(node.value, node.weight, node.color);
      });

      links.forEach(function(edge){
         graphCreator.addEdge(edge.source, edge.target);
      });
   }


   /*Creates Algorithm Tags*/
   function initializeAlgorithmButtons(){
      var pTags = algorithms.map(function(algorithm){
         var elem = document.createElement('p');
         elem.className = "algorithm";
         elem.innerHTML = algorithm;
         //elem.onclick = prepareForAlgorithm(algorithm);
         return elem;
      });

      var algColumn = document.getElementById("algorithmsColumn");
      pTags.forEach(function(p){
         var tag = algColumn.appendChild(p);
         tag.onclick = function(){runAlgorithm(p.innerHTML)};
      });
   }

   function runAlgorithm(algorithm){
      var start = prompt("What start node?");
      var goal = prompt("what goal node?");

      var func = getAlgorithmFunction(algorithm);
      var stateChanges = func(graphCreator.getNode(start), graphCreator.getNode(goal));

      for(var i = 0; i < stateChanges.length; i++){
         var change = stateChanges[i];
         var colorChanges = change["nodesChanged"];
         Object.keys(colorChanges).forEach(function(d){
            var id = Number(d);
            var color = colorChanges[d];
            var index = nodes.findIndex(node => node.id === id);
            nodes[index].color = color;
         });
         updateCanvas();
         sleep(2000);
         console.log("slept ", i, " times");
      }
   }

   function sleep(milliseconds) {
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
         if ((new Date().getTime() - start) > milliseconds){
            break;
         }
      }
   }

   function getAlgorithmFunction(algorithm){
      switch(algorithm){
         case "Breadth-First Search": return graphCreator.bfs;
         case "Depth-First Search": return graphCreator.dfs;
         case "Dijkstra's Algorithm": return graphCreator.dijkstras;
      }
      return null;
   }
}
