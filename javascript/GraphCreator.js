"use strict";

// must be given an array of nodes, and an array of edges or null for both
function GraphCreator(nodes,edges){
   console.log("created new GraphCreator");
   // declare data structures for this graph
   this.nodes = []
   this.currentID = 0;
   this.selectedNode = null;
}

// given a Node, adds to the graph
GraphCreator.prototype.addNode = function(value, weight, color) {
	var node = new Node(value, weight, color, this.currentID);
	this.currentID++;
	this.nodes[node.getID()] = node; 
	return node;
};

// given a Node, removes from the graph
// removeNode ( node id )
GraphCreator.prototype.removeNode = function(id) {
	this.nodes[id] = -1;
};

GraphCreator.prototype.getNode = function(id) {
	if (this.nodes[id] !== -1) {
		return this.nodes[id]
	} else {
		return -1;
	}
}

GraphCreator.prototype.addEdge = function(start, end) {
	this.nodes[start].addNeighbor(end);
};

GraphCreator.prototype.removeEdge = function(start, end) {
	var pos = this.nodes[start].indexOf(end);
	if (pos !== -1) {
		this.nodes[start].splice(pos, 1);
	} else {
		console.log("that edge does not exist");
	}
};

GraphCreator.prototype.djikstras = function(start){

};

GraphCreator.prototype.bfs = function(start, goal){
	var set = new Set([]);
	var q = [];

	set.add(start);
	q.push(start);
	start.visited = true;

	var change = new StateChange();
	change.addChangedNode(start, "green");
	var stateChanges = [];
	stateChanges.push(change);

	while (q.length > 0) {
		current = q.shift();
		var change = new StateChange();
		change.addChangedNode(current, "red");
		if (current.getID() == goal.getID()){
			return stateChanges;
		}
		neighbors = current.getNeighbors()
		for (i = 0; i < neighbors.length; i++){
			if (!set.has(nodes[neighbors[i]])) {
				set.add(nodes[neighbors[i]]);
				q.push(nodes[neighbors[i]]);
				nodes[neighbors[i]].parent = current;
				change.addChangedNode(nodes[neighbors[i]], "green");
			}
		}
		stateChanges.push(change);
	}
	return stateChanges;
};

GraphCreator.prototype.dfs = function(start){

};
// GraphCreator.prototype.getNextID = function(){
//    return this.currentID++;
// }




// given a Node, highlights the node/updates graph
// selectNode (given x,y)

// Moved to index?
// dragGraph (given x,y)

// Moved to node?
// editNodeName ( given name )

// clears graph
// clearGraph()
