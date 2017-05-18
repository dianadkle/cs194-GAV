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
			node.out_neighbors.delete(to_remove);
			node.out_edges.delete(id);
		}
	} else {
		for (let node of to_remove.out_neighbors) {
			node.in_neighbors.delete(to_remove);
			node.in_edges.delete(id);
		}


		for (let node of to_remove.in_neighbors) {
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
		stateChanges.push(change);
	}
	return stateChanges;
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
		var current = q.shift();
		// TODO: consider the scope of the variable "change"
		var change = new StateChange();
		change.addChangedNode(current, "red");
		if (current.id === goal.id){
			stateChanges.push(change); 
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
		/*
		neighbors = current.getNeighbors()
		for (i = 0; i < neighbors.length; i++){
			if (!set.has(nodes[neighbors[i]])) {
				set.add(nodes[neighbors[i]]);
				q.push(nodes[neighbors[i]]);
				nodes[neighbors[i]].parent = current;
				change.addChangedNode(nodes[neighbors[i]], "green");
			}
		}
		*/
		stateChanges.push(change);
	}
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

// given a Node, highlights the node/updates graph
// selectNode (given x,y)

// Moved to index?
// dragGraph (given x,y)

// Moved to node?
// editNodeName ( given name )

// clears graph
// clearGraph()
