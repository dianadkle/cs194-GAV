"use strict";
function PriorityQueue(){
    this.array = new Map([]);
}

PriorityQueue.prototype.insert = function(key, value){
    this.array.set(key, value);
};

PriorityQueue.prototype.decreaseKey = function(key, value){
    if (this.array.get(key) > value) {
        this.array.set(key, value);
    } else {
        console.log("Error: new key value is larger than current key");
    }
};

PriorityQueue.prototype.extractMin = function(){
    var minvalue = Infinity;
    var minindex = 0;
    for (var key of this.array.keys()){
        if (this.array.get(key) < minvalue){
            minvalue = this.array.get(key);
            minindex = key;
        }
    }
    this.array.delete(minindex);
    return minindex;
};

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
	// var node = new Node(value, weight, color, this.currentID++);
	// this.nodes[node.getID()] = node;
	// return node;
   return this.currentID++;
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

GraphCreator.prototype.dijkstras = function(start_id){
    var dist = [];
    var prev = [];
    var q = new PriorityQueue();

    // initialize graph values
    dist[start_id] = 0;
    for (let node of this.nodes) {
        if (node.id !== start_id) {
                dist[node.id] = Infinity;
                prev[node.id] = undefined;
        }
        q.insert(node.id, dist[node.id]);
    }

    var change = new StateChange();
    change.addChangedNode(this.nodes[start_id], "red");
    var stateChanges = [];
    stateChanges.push(change);

    // TODO: unconnected graph (minimum = Infinity)
    while (q.minimum() !== undefined) {
        var current_id = q.extractMin();
        var change = new StateChange();
        change.addChangedNode(this.nodes[current_id], "red");
        for (let edge of this.nodes[current_id].out_edges.values()) {
            var neighbor = edge.end;
            var alt = dist[current_id] + edge.weight;
            if (alt < dist[neighbor.id]) {
                dist[neighbor.id] = alt;
                prev[neighbor.id] = current_id;
                q.decreaseKey(neighbor.id, alt);
                change.changeNodeWeight(neighbor, alt);
            }
            change.addChangedNode(neighbor, "green");
        }
        stateChanges.push(change);
    }
    return stateChanges;
};


//requires start_id and goal_id
GraphCreator.prototype.bfs = function(start_id, goal_id){
	var set = new Set([]);
	var q = [];

	var start = nodes[start_id]
	var goal = nodes[goal_id]

	set.add(start);
	q.push(start);
	start.visited = true;

	var change = new StateChange();
	change.addChangedNode(start, "green");
	var stateChanges = [];
	stateChanges.push(change);

	while (q.length > 0) {
		var current = q.shift();
		var change = new StateChange();
		change.addChangedNode(current, "red");
		if (current.getID() == goal.getID()){
			stateChanges.push(change);
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

GraphCreator.prototype.dfs = function(start_id, goal_id){
        var start = this.nodes[start_id];
        var goal = this.nodes[goal_id];
        var stack = [];

        stack.push(start);
        var change = new StateChange();
        change.addChangedNode(start, "green");
        var stateChanges = [];
        stateChanges.push(change);

        while (stack.length > 0) {
                var current = stack.pop();
                var change = new StateChange();
                change.addChangedNode(current, "red");
                if (current.id === goal.id) {
                        stateChanges.push(change);
                        return stateChanges;
                }
                if (!current.visited) {
                        current.visited = true;
                        for (let node of current.out_neighbors) {
                                stack.push(node);
                                change.addChangedNode(node, "green");
                        }
                }
                stateChanges.push(change);
        }
};


GraphCreator.prototype.prims = function(start) {
	var dist = {};
	var edges = {};
	var PriorityQueue = require('priority-heap-queue');
 	var pq = new PriorityQueue({kind: 'min'});
 	var stateChanges = [];
 
	for (let node of this.nodes) {
		dist[node.id] = Infinity;
 		edges[node.id] = -1;
 		pq.insert(dist[node.id], node.id);
	}
 
 	dist[start] = 0;
 
 	while (pq.minimum() !== undefined) {
 		var current = q.extractMin();

		var change = new StateChange();
 		change.addChangedNode(current, "green");
 
 		if (edges[current] !== -1) {
 			change.addChangedEdge(this.nodes[edges[current]], "green");
 		}

 		stateChanges.push(change);
 
 		for (let edge of this.nodes[current].out_edges) {
			var neighbor = edge.end;
 			if (edge.weight < dist[current]) {
 				dist[neighbor] = edge.weight;
 				edges[neighbor] = current;
 				pq.decreaseKey(neighbor, edge.weight); //decreaseKey requires index of key?
 			}
 		}
 	}
 
 	return stateChanges;
}
 
GraphCreator.prototype.kruskals = function() {
	var set = disjointSet();
 	var PriorityQueue = require('priority-heap-queue');
 	var pq = new PriorityQueue({kind: 'min'});
 	var stateChanges = [];
 
 	for (let edge of this.edges) {
 		pq.insert(edge.weight, edge);
 	}
 
 	for (let node of this.nodes) {
 		set.add(node);
 	}
 
 	while (pq.minimum() !== undefined) {
 		var minEdge = pq.extractMin();
 		var change = new StateChange();
 
		if (!set.connected(minEdge.start, minEdge.end)) {
 			change.addChangedEdge(minEdge, "green");
 		}
		else {
 			change.addChangedEdge(minEdge, "red");
 		}
 		stateChanges.push(change);
 	}
 
 	return stateChanges;
}

GraphCreator.prototype.bellmanFord = function(start) {
	var distance = {};
 	var predecessor = {};
 	var stateChanges = [];
 
 	for (let node in this.nodes) {
 		distance[node.id] = Infinity;
 		predecessor[node.id] = null;
 	}
 
 	distance[start.id] = 0;
 
 	for (var i = 0; i < this.nodes.length; i++) {
 		for (let edge in this.edges) {
 			var change = new StateChange();
 			change.addChangedEdge(edge, "red");
 			stateChanges.push(change);
 
 			if (distance[edge.start.id] + edge.weight < distance[edge.end.id]) {
 				distance[edge.end.id] = distance[edge.start.id] + edge.weight;
 				predecessor[edge.end.id] = edge.start.id;
 			
 				change = new StateChange();
 				change.addChangedEdge(edge, "green");
 			}
 			//TODO: Change node values?
 		}		
 	}
 
 	for (let edge in this.edges) {
 		if (distance[edge.start.id] + edge.weight < distance[edge.end.id]) {
 			//TODO: Error: Graph contains negative-weight cycle
 		}
 	}
 
 	return stateChanges;
}
 
GraphCreator.prototype.floydWarshall = function(start, end) {
 	var stateChanges = [];
 	var V = this.nodes.length;
 	var dist = createArray(V, V);
 	var next = createArray(V, V);
 
 	for (let edge in this.edges) {
 		u = edges.start;
 		v = edges.end;
 
 		dist[u][v] = edge.weight;
 		next[u][v] = v;
 	}
 
 	for (var k = 0; k < V-1; k++) {
 		for (var i = 0; i < V-1; i++) {
 			for (var j = 0; j < V-1; j++) {
 				if (dist[i][j] > dist[i][k] + dist[k][j]) {
 					dist[i][j] = dist[i][k] + dist[k][j];
 					next[i][j] = next[i][k];
 
 					//TODO:: Update tables
 				}
 			}
 		}
 	}
 
 	var path = findPath(start, end, next);
 	for (var index = 0; index < path.length; index++) {
 		var nodeId = path[index];
 		var node = this.nodes[nodeId]
 
 		var change = new StateChange();
 		change.addChangedNode(node, "green");
 		stateChanges.push(change);
 
 		if (nodeId != end) {
 			var nextNodeId = path[index+1];
 			change = new StateChange();
 			change.addChangedEdge(node.out_edges[nextNodeId], "green");
 			stateChanges.push(change);
 		}
 	}
 
 	return stateChanges;
}
 
function findPath(u, v, next) {
 	if (next[u][v] === null) {
		return [];
 	}
	var path = [u];
	while (start !== end) {
 		u = next[u][v];
 		path.push(u);
 	}
 
 	return path;
}
 
//http://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript/966938#966938
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

GraphCreator.prototype.reverseDelete = function() {
	var PriorityQueue = require('priority-heap-queue');
	var pq = new PriorityQueue();
 	var stateChanges = [];
 
 	for (let edge in this.edges) {
 		pq.insert(edge.weight, edge);
 	}
 
 	while (pq.minimum() !== undefined) {
 		var maxEdge = pq.extractMax();
 		var change = new StateChange();
 		change.addChangedEdge(maxEdge, "green");
 		stateChanges.push(change);
 
 		maxEdge.changeColor("red");

 		if (!isConnected(maxEdge.start, maxEdge.end)) {
 			maxEdge.changeColor("green");
 		}
 		else {
 			change = new StateChange();
 			change.addChangedEdge(maxEdge, "red");
 			stateChanges.push(change);
 		}
 	}

 	return stateChanges;
}
 
function isConnected(start, end) {
 	var done = new Set([]);
 	var toDo = [];
 
	done.add(start);
 	toDo.push(start);
 
	if (start === end) return true;
 
 	while (toDo.length > 0) {
		var current = toDo.shift();
 
 		for (let node of current.out_neighbors) {
 			if (current.out_edges[node.id].color !== "red") {
 				if (node.id === end.id){
 					return true;
 				}	
 
 				if (!set.has(node)) {
 					q.push(node);
 				}
 			}
 			
 		}
 	}
 	return false;
};

