'use strict';

var GraphCreator = require('./GraphCreator');
var Utils = require('./Utils');

/***********************************Index.js***********************************/


var nodes = [
   //520 x //560
   {x:280-10, y:10, id: 0, value: "Arlene", weight: Infinity, color: "yellow"},//1
   {x:140-10, y:110, id: 1, value: "Brett", weight: Infinity, color: "yellow"},//2
   {x:420-10, y:110, id: 2, value: "Cindy", weight: Infinity, color: "yellow"},//2
   {x:70-10, y:210, id: 3, value: "Dennis", weight: Infinity, color: "yellow"},//3
   {x:210-10, y:150, id: 4, value: "Emily", weight: Infinity, color: "yellow"},//3
   {x:350-10, y:210, id: 5, value: "Frank", weight: Infinity, color: "yellow"},//3
   {x:490-10, y:210, id: 6, value: "Gilbert", weight: Infinity, color: "yellow"},//3
   {x:35-10, y:310, id: 7, value: "Harvey", weight: Infinity, color: "yellow"},//4
   {x:105-10, y:310, id: 8, value: "Irene", weight: Infinity, color: "yellow"},//4
   {x:175-10, y:310, id: 9, value: "Jose", weight: Infinity, color: "yellow"},//4
   {x:245-10, y:310, id: 10, value: "Katrina", weight: Infinity, color: "yellow"},//4
   {x:315-10, y:310, id: 11, value: "Lee", weight: Infinity, color: "yellow"},//4
   {x:385-10, y:310, id: 12, value: "Maria", weight: Infinity, color: "yellow"},//4
   {x:455-10, y:310, id: 13, value: "Nate", weight: Infinity, color: "yellow"},//4
   {x:525-10, y:310, id: 14, value: "Ophelia", weight: Infinity, color: "yellow"}//4

];

var links = [
   {source:0, target: 1, color: 'blue', weight:undefined},
   {source:2, target: 0, color: 'blue', weight:undefined},
   {source:3, target: 1, color: 'blue', weight:undefined},
   {source:1, target: 4, color: 'blue', weight:undefined},
   {source:2, target: 5, color: 'blue', weight:undefined},
   {source:6, target: 2, color: 'blue', weight:undefined},
   {source:3, target: 7, color: 'blue', weight:undefined},
   {source:8, target: 3, color: 'blue', weight:undefined},
   {source:4, target: 9, color: 'blue', weight:undefined},
   {source:4, target: 10, color: 'blue', weight:undefined},
   {source:5, target: 11, color: 'blue', weight:undefined},
   {source:5, target: 12, color: 'blue', weight:undefined},
   {source:13, target: 6, color: 'blue', weight:undefined},
   {source:14, target: 6, color: 'blue', weight:undefined}
];

function GraphSVGHandler(){
   var radius = 20;
   var selectedNode = null, selectedTag = null;
   var clickWasOnNode = false, dblClickWasOnSVG = true;
   var directed = false;

   var svg = d3.select("#graphSVG")
      .on("click", clickedOnSVG)
      .on("dblclick", dblClickedOnSVG);

   var idCount = 0;

   var stateChanges = null;
   var current_state_change = -1;
   var current_algorithm = null;


   //force simulation
   var simulation = d3.forceSimulation()
   .force("link", d3.forceLink().distance(radius * 7).id(function(d) { return d.id; }));

   //node and link svg data
   var node = null, link = null, linkLabel = null;

   var graphCreator = new GraphCreator(false);

   importData();

   updateCanvas();

   /************* called every time the canvas needs to be updated *************/
   function updateCanvas() {

      //clear SVG
      svg.selectAll("*").remove();
      node = null, link = null, linkLabel = null;

      //define arrow marker
      svg.append("defs").append("marker")
      .attr("id", "arrow").attr("viewBox", "0 -5 10 10")
      .attr("refX", 22).attr("refY", 0)
      .attr("markerWidth", 8).attr("markerHeight", 8)
      .attr("orient", "auto")
      .append("svg:path").attr("d", "M0,-5L10,0L0,5").style("fill", "2196F3");

      //define toolTip
      var toolTip = d3.tip().attr('class', 'd3-tip').offset([-10, 0])
      .html(function(d) {
         var htmlStr = "<strong>Value:</strong> <span style='color:red'>" + d.value + "</span><br/>";
         htmlStr += "<strong>Weight:</strong> <span style='color:red'>" + d.weight + "</span>";
         return htmlStr;
      });
      svg.call(toolTip);

      //links consist of lines, classed "link"
      var linkGroup = svg.selectAll("link").data(links, function(d) { return d.target.id; })
      linkGroup = linkGroup.enter().append("g").on("dblclick", dblClickedOnEdge);
      link = linkGroup.append("line").attr("class", "link")
      .raise().classed("edgeBlue", function(d){return d.color === "blue"})
      .raise().classed("edgeRed", function(d){return d.color === "red"});
      if(directed) link.attr("marker-end", "url(#arrow)");
      link.append("text").attr('text-anchor', 'middle')
      .attr("x", 0).attr("y", "0").text("function(d){return d.weight;}")
      linkLabel = linkGroup.append("text")
      .attr('text-anchor', 'middle')
      .attr("x", (function(d, i){
         var source = d['source'], target = d['target'];
         var x1, x2;
         if(typeof source === "number"){
            x1 = nodes.find(node => source === node.id).x;
            x2 = nodes.find(node => target === node.id).x;
         } else {
            x1 = source.x;
            x2 = target.x;
         }
         return (x1 + x2) / 2;
      }))
      .attr("y", (function(d, i){
         var source = d['source'], target = d['target'];
         var y1, y2;
         if(typeof source === "number"){
            y1 = nodes.find(node => source === node.id).y;
            y2 = nodes.find(node => target === node.id).y;
         } else {
            y1 = source.y;
            y2 = target.y;
         }
         return (y1 + y2) / 2;
      }))
      .text(function(d) { return d.weight })

      //nodes are bound with nodes from the nodes array
      node = svg.selectAll("node").data(nodes, function(d) { return d.id; });

      //node consists of circle and text
      node = node.enter().append("g")
      .on("click", clickedOnNode)
      .on("dblclick", dblClickedOnNode)
      .call(d3.drag()
         .on("start", function(d){dragstarted(d); toolTip.hide();})
         .on("drag", function(d){dragged(d); toolTip.hide();})
         .on("end", function(d){dragended(d); toolTip.hide();}))
      .on('mouseenter', toolTip.show).on('mouseleave', toolTip.hide);

      //create node
      node.append("circle")
      .attr("r", radius)
      .attr("class", "nodeCircle")
      .raise().classed("dormant", true)
      .raise().classed("nodeYellow", function(d){return d.color === "yellow"})
      .raise().classed("nodeGreen", function(d){return d.color === "green"})
      .raise().classed("nodeRed", function(d){return d.color === "red"});

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
      }
      if(edges === undefined){
         links.push({source: sourceID, target: targetID, color: 'blue', weight: undefined});
         graphCreator.addEdge(sourceID, targetID, 0);
      }
   }

   /* update state variables to prevent new nodes from being created on db click*/
   function dblClickedOnNode(d){
      dblClickWasOnSVG = false;
      Utils.promptNodeChanges(nodes, d);
   }

   /* update state variables to prevent new nodes from being created on db click*/
   function dblClickedOnEdge(d){
      dblClickWasOnSVG = false;
      Utils.promptEdgeChanges(links, d);
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
      if(!dblClickWasOnSVG){
         dblClickWasOnSVG = true;
         return;
      }

      if(selectedNode !== null) return;
      Utils.displayNewNodeModal(nodes, d3.mouse(this));
   }

   function generateNewNode(){
      var newNodeInfo = Utils.getNewNodeInfo();
      if(newNodeInfo === null) return;
      var weight = newNodeInfo[0],
      value = newNodeInfo[1],
      coords = newNodeInfo[2];

      //create circle
      var newNodeObj = graphCreator.addNode(value, weight, "yellow");
      var newNode= {
         x: Math.round( coords[0]),  // Takes the pixel number to convert to number
         y: Math.round( coords[1]),
         value: value,
         weight: weight,
         color: "yellow",
         id: newNodeObj.id
      };
      nodes.push(newNode);
      updateCanvas();
   }

   GraphSVGHandler.prototype.generateNewNode = function(coords){
      generateNewNode(coords);
   };

   /** updating function, called every time canvas needs to be updated**/
   function ticked() {
      link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

      linkLabel
      .attr("x", (function(d){
         return (d.source.x + d.target.x) / 2;
      }))
      .attr("y", (function(d){
         return (d.source.y + d.target.y) / 2;
      }));

      node
      .attr("transform", function(d) { return "translate(" + d.x + ", " + d.y + ")"; });
   }

   function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
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
         var source = edge['source'], target = edge['target'];
         if((typeof source) === "number"){
            graphCreator.addEdge(source, target, 0);
         } else {
            graphCreator.addEdge(source.id, target.id, 0);
         }
      });
   }

   function prepareAlgorithm(algorithm){
      clearNodeColors();
      clearEdgeColors();
      current_algorithm = algorithm;
      Utils.promptAlgorithmInputs();
   }

   function getStateChangeSequence(start, goal){
      switch(current_algorithm){
         case "Breadth-First Search": return graphCreator.c_bfs(start, goal);
         case "Depth-First Search": return graphCreator.c_dfs(start, goal);
         case "Dijkstra's Algorithm": {
            for (var i = 0; i < nodes.length; i++){
               nodes[i].weight = Infinity;
            }
            var index = nodes.findIndex(node => node.id === start);
            nodes[index].weight = 0;
            return graphCreator.c_dijkstras(start, goal);
         }
      }
      return null;
   }

   function updateWeights(change){
      var weightChanges = change["nodeWeightsChanged"];
      Object.keys(weightChanges).forEach(function(d){
         var id = Number(d);
         var weight = Number(weightChanges[d]);
         var index = nodes.findIndex(node => node.id === id);
         nodes[index].weight = weight;
      });
   }

   function reverseWeights(change){
      var weightChanges = change["nodePrevWeights"];
      Object.keys(weightChanges).forEach(function(d){
         var id = Number(d);
         var weight = Number(weightChanges[d]);
         var index = nodes.findIndex(node => node.id === id);
         nodes[index].weight = weight;
      });
   }

   function updateEdgeColors(change){

      var edges = change['edgesChanged'];

      for (var edge of edges.keys()){
         var sourceID = edge.start.id, targetID = edge.end.id,
         newColor = edges.get(edge);
         var index = links.findIndex(link => link.source.id === sourceID && link.target.id === targetID);
         links[index].color = newColor;
      }
   }

   function reverseEdgeColors(change){
      var edges = change['edgesChanged'];

      for (var edge of edges.keys()){
         var sourceID = edge.start.id, targetID = edge.end.id,
         newColor = edges.get(edge);
         if(newColor === 'red'){
            var index = links.findIndex(link => link.source.id === sourceID && link.target.id === targetID);
            links[index].color = 'blue';
         }
      }
   }

   function reverseNodeColors(change){
      var colorChanges = change["nodesPrev"];
      Object.keys(colorChanges).forEach(function(d){
         var id = Number(d);
         var color = colorChanges[d];
         var index = nodes.findIndex(node => node.id === id);
         nodes[index].color = color;
      });
   }

   function changeNodeColors(change){
      var colorChanges = change["nodesChanged"];
      Object.keys(colorChanges).forEach(function(d){
         var id = Number(d);
         var color = colorChanges[d];
         var index = nodes.findIndex(node => node.id === id);
         nodes[index].color = color;
      });
   }

   function clearNodeColors(){
      for(var i = 0; i < nodes.length; i++){
         nodes[i].color = "yellow";
      }
   }
   function clearEdgeColors(){
      for(var i = 0; i < links.length; i++){
         links[i].color = "blue";
      }
   }



   /************************* To be used in Index.js *************************/
   GraphSVGHandler.prototype.prepareAlgorithm = function(algorithm){
      prepareAlgorithm(algorithm);
   };

   GraphSVGHandler.prototype.runAlgorithm = function(){
      var startAndGoal = Utils.getStartAndGoalNodeIDs(nodes);
      if(startAndGoal === "EMPTY_VALUES"){
         alert("Make sure you enter both a start and goal value");
      } else if(startAndGoal === "SAME_VALUES"){
         alert("Make sure you enter different values");
      } else if(startAndGoal === "NONEXISTENT_VALUES"){
         alert("Make sure you enter values that already exist");
      } else if (startAndGoal !== null) {
         var start = startAndGoal[0], goal = startAndGoal[1];
         stateChanges = getStateChangeSequence(start, goal);
         current_state_change = -1;
         updateCanvas();
         alert("start clicking the arrow buttons!");
         return true;
      }
      return false;
   }

   // returns current algorithm or null if one is not selected
   GraphSVGHandler.prototype.getCurrentAlgorithm = function(){
      return current_algorithm;
   };

   //returns 'SUCCESS' if next step was animated, 'END' if that step was the last
   // step, and 'FAILURE' otherwise
   GraphSVGHandler.prototype.runNextAlgorithmStep = function(){
      if(stateChanges === null || stateChanges === undefined) return 'FAILURE';
      if(current_state_change < stateChanges.length - 1){
         var change = stateChanges[++current_state_change];
         changeNodeColors(change);
         updateWeights(change);
         updateEdgeColors(change);
         // TODO:
         // updateEdgeWeights(change);
         updateCanvas();
         if(current_state_change < stateChanges.length) return change.comment;
      }
      return 'END';
   };

   GraphSVGHandler.prototype.runPreviousAlgorithmStep = function(){
      if(stateChanges === null || stateChanges === undefined) return 'FAILURE';
      if(current_state_change  > 0){
         var change = stateChanges[current_state_change--];
         reverseNodeColors(change);
         reverseWeights(change);
         reverseEdgeColors(change);
         updateCanvas();
         if(current_state_change < stateChanges.length) return change.comment;
      }
      return 'END';
   };

   GraphSVGHandler.prototype.toggleDirection = function(){
      if(directed){
         directed = false;
         link.attr("marker-end", null);
      } else {
         directed = true;
         link.attr("marker-end", "url(#arrow)");
      }
      graphCreator = new GraphCreator(directed);
      importData();
      if(current_algorithm !== null) prepareAlgorithm(current_algorithm);
      return directed;
   }

   GraphSVGHandler.prototype.clearAlgorithm = function(){
      stateChanges = null;
      current_state_change = -1;
      current_algorithm = null;
      clearNodeColors();
      updateCanvas();
   };

   GraphSVGHandler.prototype.deleteNode = function (id){
      var index = nodes.findIndex(node => node.id === id);
      if(index === -1) return;
      graphCreator.removeNode(id);
      nodes.splice(index, 1);

      links = links.filter(function(edge){
         var source = edge['source'], target = edge['target'];
         if((typeof source) === "number"){
            return source !== id && target !== id;
         } else {
            return source.id !== id && target.id !== id;
         }
      });
      updateCanvas();
   };

   GraphSVGHandler.prototype.editEdge = function (){
      var edge = Utils.getChangingEdge();
      var sID = edge.source.id, tID = edge.target.id;
      var newWeight = Utils.getNewWeight();
      if(newWeight !== null){
         var index = links.findIndex(edge => edge.source.id === sID
                                          && edge.target.id === tID);
         if(index === -1) return;
         graphCreator.removeEdge(sID, tID);
         graphCreator.addEdge(sID, tID, newWeight);
         links[index].weight = newWeight;
         if(newWeight <= 0 || newWeight === undefined) {
            links[index].weight = undefined;
         } else {
            links[index].weight = newWeight;
         }
         updateCanvas();
      }
   };

   GraphSVGHandler.prototype.deleteEdge = function (){
      var edge = Utils.getChangingEdge();
      var sID = edge.source.id, tID = edge.target.id;
      var index = links.findIndex(edge => edge.source.id === sID
                                       && edge.target.id === tID);
      if(index === -1) return;
      graphCreator.removeEdge(sID, tID);
      links.splice(index, 1);
      updateCanvas();
   };

   GraphSVGHandler.prototype.downloadGraph = function(){
      return graphCreator.toString();
   }
}

module.exports = GraphSVGHandler;
