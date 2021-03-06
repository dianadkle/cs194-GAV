'use strict';

function Node(value, weight, color, id){
    this.value = value;
    this.id = id;
    this.weight = weight;
    this.color = color;
    this.intermediateValue = null;
    this.visited = false;
    // We require two neighbor sets for directed graphs.
    // For undirected graphs, we will only use the "out" fields
    this.in_neighbors = new Set([]);	// nodes pointing to current
    this.out_neighbors = new Set([]);	// current points to these
    // the corresponding edges for the above node lists
    this.in_edges = new Map([]);	// map: node ID -> edge
    this.out_edges = new Map([]);
    this.parent = null;
}

// clears all values relevant to algorithmic side of things
Node.prototype.node_reset = function(){
   this.visited = false;
   this.intermediateValue = null;
   this.weight = 0;
};

Node.prototype.getID = function(){
   return this.id;
};

module.exports = Node;
