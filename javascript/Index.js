'use strict';

var nodes = [
   {x:20, y:300, id: 1000, value: "Arlene", weight: 2, color: "yellow"},
   {x:600, y:200, id: 1001, value: "Brett", weight: 5, color: "yellow"},
   {x:400, y:100, id: 1002, value: "Cindy", weight: 3, color: "yellow"},
   {x:200, y:500, id: 1003, value: "Dennis", weight: 6, color: "yellow"},
   {x:300, y:400, id: 1004, value: "Emily", weight: 4, color: "yellow"},
   {x:450, y:250, id: 1005, value: "Frank", weight: 1, color: "yellow"},
   {x:40, y:350, id: 1006, value: "Gilbert", weight: 7, color: "yellow"},
   {x:220, y:450, id: 1007, value: "Harvey", weight: 9, color: "yellow"},
   {x:140, y:550, id: 1008, value: "Irene", weight: 8, color: "yellow"},
   {x:700, y:50, id: 1009, value: "Jose", weight: 11, color: "yellow"},
   {x:600, y:150, id: 1010, value: "Katrina", weight: 12, color: "yellow"},
   {x:360, y:200, id: 1011, value: "Lee", weight: 10, color: "yellow"},
   {x:100, y:320, id: 1012, value: "Maria", weight: 13, color: "yellow"}
];

var links = [
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
   {source: 1009, target: 1003},
   {source: 1000, target: 1012}
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

   var graphCreator = new GraphCreator();

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
      .raise().classed("nodeYellow", true);

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
      var newNode= {
         x: Math.round( coords[0]),  // Takes the pixel number to convert to number
         y: Math.round( coords[1]),
         id: idCount++,//graphCreator.addNode('test_value', idCount++, 'yellow'),
         value: value,
         weight: weight,
         color: "yellow"
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
}
