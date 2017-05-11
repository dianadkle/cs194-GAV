"use strict";

// must be given an array of nodes, and an array of edges or null for both
function GraphCreator(nodes,edges){
   console.log("created new GraphCreator");
   // declare data structures for this graph
   this.nodes = nodes || [];
   this.edges = edges || [];

   this.selectedNode = null;
}

GraphCreator.prototype.helloWorld = function(node){
   console.log("hello, world!");
};

// given a Node, adds to the graph
GraphCreator.prototype.AddNode = function(node) {
	this.nodes 
};

// given a Node, removes from the graph
// removeNode ( given Node )
GraphCreator.prototype.removeNode = function(node) {
	this.nodes
}




// given a Node, highlights the node/updates graph
// selectNode (given x,y)

// Moved to index?
// dragGraph (given x,y)

// Moved to node?
// editNodeName ( given name )

// clears graph
// clearGraph()

