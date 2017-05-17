"use strict";

// must be given an array of nodes, and an array of edges or null for both
function StateChange(){
   this.nodesChanged = {};
   this.edgesChanged= new Set([]);
   this.nodeWeightsChanged = {};
   this.edgeWeightsChanged = {};
}

// given a Node, adds to the graph
StateChange.prototype.addChangedNode = function(node, color) {
	this.nodesChanged[node] = color;
};

StateChange.prototype.getChangedNodes = function() {
	return this.nodesChanged;
};

StateChange.prototype.addChangedEdge = function(edge) {
	this.edgesChanged.add(node);
};

StateChange.prototype.getChangedEdges = function() {
	return this.edgesChanged;
}
