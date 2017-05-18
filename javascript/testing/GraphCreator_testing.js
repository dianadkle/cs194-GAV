"use strict";

// always create an empty graph
function GraphCreator(is_directed){
	// An undirected graph will only make use of the "out" Node fields
	if(is_directed === true) {
		this.directed = true;
	} else {
		this.directed = false;
	}
	console.log("created new GraphCreator");
	// a removed node will be replaced by the value -1
	this.nodes = []
	this.currentID = 0;
	this.selectedNode = null;
}


// creates new node and adds it to graph
GraphCreator.prototype.addNode = function(value, weight, color) {
	this.nodes[this.currentID] = new Node(value, weight, color, this.currentID);
	this.currentID++;
	return this.nodes[this.currentID];
};

// remove node from graph by ID
GraphCreator.prototype.removeNode = function(id) {
	var to_remove = this.nodes[id];
	// TODO: Make sure === is the right comparison operator
	if (to_remove === -1) {
		console.log("Error: node cannot be removed (does not exist)");
	}

	//
	if(this.directed) {
		for (let node of to_remove.out_neighbors) {
			node.in_neighbors.delete(to_remove);
			node.in_edges.delete(id);
		}

		for (let node of to_remove.in_neighbors) {
			node.out_neighbors.delete(to_remove);
			node.out_edges.delete(id);
		}
	} else {
		for (let node of to_remove.out_neighbors) {
			node.out_neighbors.delete(to_remove);
			node.out_edges.delete(id);
		}
	}

	this.nodes[id] = -1;
};

// return node given ID
GraphCreator.prototype.getNode = function(id) {
	return this.nodes[id];
};


// adds an edge: start node -> end node
// possible TODO: change params to node objs (opposed to node ids) if better
GraphCreator.prototype.addEdge = function(start_id, end_id) {
	var start_node = this.nodes[start_id];
	var end_node = this.nodes[end_id];
	var new_edge = new Edge(start_node, end_node);
	
	start_node.out_neighbors.add(end_node);
	start_node.out_edges.set(end_id, new_edge);

	if (this.directed) {
		end_node.in_neighbors.add(start_node);
		end_node.in_edges.set(start_id, new_edge);
	} else { // undirected = always use "out" fields
		end_node.out_neighbors.add(start_node);
		end_node.out_edges.set(start_id, new_edge);
	}
};

// removes an edge given start and end node IDs
// possible TODO: change params to node objs (opposed to node ids) if better
GraphCreator.prototype.removeEdge = function(start_id, end_id) {
	var start_node = this.nodes[start_id];
	if(!start_node.out_edges.has(end_id)) {
		console.log("Error: edge cannot be removed (does not exist)");
		return;
	}
	var end_node = this.nodes[end_id];
	start_node.out_neighbors.delete(end_node);
	start_node.out_edges.delete(end_id);

	if (this.directed) {
		end_node.in_neighbors.delete(start_node);
		end_node.in_edges.delete(start_id);
	} else { // undirected = always use "out" fields
		end_node.out_neighbors.delete(start_node);
		end_node.out_edges.delete(start_id);
	}

};

GraphCreator.prototype.dijkstras = function(start, goal){
	var dist = {};
	var PriorityQueue = require('priority-heap-queue');
	var q = new PriorityQueue({kind: 'min'});

	dist[start] = 0;

	for (let node of this.nodes) {
		if (node.id !== goal.id) {
			dist[node.id] = Infinity;
			prev[node.id] = undefined;
		}
		q.insert(node.id, dist[node.id]);
	}

	var change = new StateChange();
	change.addChangedNode(start, "red");
	var stateChanges = [];
	stateChanges.push(change);

	while (q.minimum() !== undefined) {
		var current = q.extractMin();
		var change = new StateChange();
		change.addChangedNode(current, "red");
		for (let edge of nodes[current].out_edges) {
			neighbor = edge.end;
			var alt = dist[current] + edge.weight;
			if (alt < dist[neighbor]) {
				dist[neighbor] = alt;
				prev[neighbor] = current;
				q.decreaseKey(neighbor, alt);
			}
			change.addChangedNode(neighbor, "green");
			//TODO: consider also changing node "weight" or "distance" to 
			//show what the distance is at each point.
		}
	}
};

GraphCreator.prototype.bfs = function(start_id, goal_id){
	
	var start = this.nodes[start_id];
	var goal = this.nodes[goal_id];
	var set = new Set([]);
	var q = [];

	set.add(start);
	q.push(start);
	start.visited = true;

	var change = new StateChange();
	change.addChangedNode(start, "green");
	var stateChanges = [];
	stateChanges.push(change);

	//console.log("asddsfds");
//	console.log(stateChanges.length);
	while (q.length > 0) {
		var current = q.shift();
		//console.log("current ID: " + current.id);
		// TODO: consider the scope of the variable "change"
		var change = new StateChange();
		change.addChangedNode(current, "red");
		if (current.id === goal.id){
			stateChanges.push(change); 
			//console.log(stateChanges.length);
			return stateChanges;
		}
		// TODO: accomodate for directed/undirected graphs
		for (let node of current.out_neighbors) {
			if (!set.has(node)) {
				set.add(node);
				q.push(node);
				node.parent = current;
				change.addChangedNode(node, "green");
			}
		}
		stateChanges.push(change);
		//console.log("cur len: " + stateChanges.length);
	}
	//console.log(stateChanges.length);

	return stateChanges;
};

// Possible TODO: use IDs as parameters (instead of nodes)
GraphCreator.prototype.dfs = function(start, goal){
	var set = new Set([]);
	set.push(start);
	var change = new StateChange();
	change.addChangedNode(start, "green");
	var stateChanges = [];
	stateChanges.push(change);

	while (set.size > 0) {
		var current = set.pop();
		// TODO: consider the scope of the variable "change"
		var change = new StateChange();
		change.addChangedNode(current, "red");
		if (current.id === goal.id) {
			stateChanges.push(change); 
			return stateChanges;
		}
		if (!current.visited){
			current.visited = true;
			for (let node of current.out_neighbors) {
				set.push(node);
				change.addChangedNode(node, "green");
			}
		}
		stateChanges.push(change); 
	}
};

function Node(value, weight, color, id){
    // this.x = x;
    // this.y = y;
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
    // this.ends = new Set([]);
}

// clears all values relevant to algorithmic side of things
Node.prototype.node_reset = function(){
   this.visited = false;
   this.intermediateValue = null;
   this.weight = 0;
};

Node.prototype.out_str = function() {
	var retval = "";
	for (let neighbor of this.out_neighbors) {
		retval += neighbor.value + " ";
		//retval = retval.concat(neighbor.value + " ");
	}
	return retval;
}

Node.prototype.in_str = function() {
	var retval = "";
	for (let neighbor of this.in_neighbors) {
		retval += neighbor.value + " ";
		//retval = retval.concat(neighbor.value + " ");
	}
	return retval;
}

function Edge(start, end){
   // if(a === b){
   //    ;//TODO: assert error
   // }
   this.start = start;
   this.end = end;
}

Edge.prototype.switchDirection = function(){
   var temp = this.start;
   this.start = this.end;
   this.end = temp;
};


GraphCreator.prototype.toString = function() {
	var x = 0;
	console.log("Node list");
	for (let node of this.nodes) {
		if (node !== -1) {
			x++;
			console.log(node.id + ": " + node.value);
		}
	}

	console.log("Out edge lists");
	for (let node of this.nodes) {
		if (node !== -1) {
			console.log(node.id + ": " + node.out_str());
		}
	}
	console.log("In edge lists");
	for (let node of this.nodes) {
		if (node !== -1) {
			console.log(node.id + ": " + node.in_str());
		}
	}
	console.log("-------------------");
};

function StateChange(){
   this.nodesChanged = {};
   this.edgesChanged= new Set([]);
   this.nodeWeightsChanged = {};
   this.edgeWeightsChanged = {};
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
}

let x = new GraphCreator(true);

x.addNode("A1", 2, "black");
x.addNode("B2", 4, "black");
x.addNode("C3", 8, "black");
x.addNode("D4", 16, "black");
x.addNode("E5", 32, "black");

x.addEdge(0, 1);
x.addEdge(2, 1);
x.addEdge(1, 4);

x.removeNode(3);
//x.removeNode(1);


x.toString();

var changes = x.bfs(0, 4);

console.log(changes.length + " state changes in alg");

for(let change of changes) {
	console.log(change);
}


// given a Node, highlights the node/updates graph
// selectNode (given x,y)

// Moved to index?
// dragGraph (given x,y)

// Moved to node?
// editNodeName ( given name )

// clears graph
// clearGraph()
