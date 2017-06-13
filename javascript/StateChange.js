"use strict";

// must be given an array of nodes, and an array of edges or null for both
function StateChange(type_str){
   this.nodesChanged = {};
   this.nodesPrev = {};
   this.edgesChanged= new Map();
   this.nodeWeightsChanged = {};
   this.nodePrevWeights = {};
   this.edgeWeightsChanged = {};
   this.comment = "";
   // Line Of PseudoCode corresponding to algorithm execution (0 = no line)
   this.executed_lopc = 0;
   this.structure_type = type_str;
   this.data_structure = null;
}

// given a Node, adds to the graph
StateChange.prototype.addChangedNode = function(node, color) {
	this.nodesChanged[node.id] = color;
	this.nodesPrev[node.id] = node.color;
	node.color = color;
};

StateChange.prototype.getChangedNodes = function() {
	return this.nodesChanged;
};

StateChange.prototype.addChangedEdge = function(edge, color) {
	this.edgesChanged.set(edge, color);
};

StateChange.prototype.getChangedEdges = function() {
	return this.edgesChanged;
};

StateChange.prototype.changeNodeWeight = function(node, weight, prev) {
	this.nodeWeightsChanged[node.id] = weight;
	this.nodePrevWeights[node.id] = prev;
};

StateChange.prototype.getChangedNodeWeights = function() {
	return this.nodeWeightsChanged;
};

StateChange.prototype.addComment = function(str_comment) {
	this.comment = str_comment;
};

StateChange.prototype.lopc = function(line_no) {
	this.executed_lopc = line_no;
};

StateChange.prototype.struct = function(struc) {
	this.data_structure = struc;
};

module.exports = StateChange;
