"use strict";

// must be given an array of nodes, and an array of edges or null for both
function StateChange(){
   this.nodesChanged = {};
   this.edgesChanged= new Set([]);
   this.nodeWeightsChanged = {};
   this.edgeWeightsChanged = {};
   this.comment = "";
   // Line Of PseudoCode corresponding to algorithm execution (0 = no line)
   this.executed_lopc = 0;
}

// given a Node, adds to the graph
StateChange.prototype.addChangedNode = function(node, color) {
	this.nodesChanged[node.id] = color;
};

StateChange.prototype.getChangedNodes = function() {
	return this.nodesChanged;
};

StateChange.prototype.addChangedEdge = function(edge) {
	this.edgesChanged.add(node);
};

StateChange.prototype.getChangedEdges = function() {
	return this.edgesChanged;
};

StateChange.prototype.changeNodeWeight = function(node, weight) {
	this.nodeWeightsChanged[node.id] = weight;
};

StateChange.prototype.getChangedNodeWeights = function() {
	return this.nodeWeightsChanged;
}

StateChange.prototype.addComment = function(str_comment) {
	this.comment = str_comment;
}

StateChange.prototype.lopc = function(line_no) {
	this.executed_lopc = line_no;
}

module.exports = StateChange;
