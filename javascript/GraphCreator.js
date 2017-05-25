"use strict";

var Node = require('./Node');
var Edge = require('./Edge');
var StateChange = require('./StateChange');

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

PriorityQueue.prototype.minimum = function(){
    return this.array.size > 0;
}

// always create an empty graph
function GraphCreator(is_directed){
        // An undirected graph will only make use of the "out" Node fields
        if(is_directed === true) {
                this.directed = true;
        } else {
                this.directed = false;
        }
        // a removed node will be replaced by the value -1
        this.nodes = []
        this.currentID = 0;
        this.selectedNode = null;
}


// creates new node and adds it to graph
GraphCreator.prototype.addNode = function(value, weight, color) {
        this.nodes[this.currentID] = new Node(value, weight, color, this.currentID);
        return this.nodes[this.currentID++];
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
GraphCreator.prototype.addEdge = function(start_id, end_id, weight) {
        var start_node = this.nodes[start_id];
        var end_node = this.nodes[end_id];
        var new_edge = new Edge(start_node, end_node, weight);

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
    change.addChangedNode(this.nodes[start_id], "green");
    var stateChanges = [];
    stateChanges.push(change);

    // TODO: unconnected graph (minimum = Infinity)
    while (q.minimum()) {
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
    for (let node of this.nodes){
        node.visited = false;
        node.color = "yellow";
    }
    return stateChanges;
};


//requires start_id and goal_id
GraphCreator.prototype.bfs = function(start_id, goal_id){
	// var set = new Set([]);
	var q = [];

	var start = this.nodes[start_id]
	var goal = this.nodes[goal_id]

	// set.add(start);
	q.push(start);
	start.visited = true;

	var change = new StateChange();
	change.addChangedNode(start, "green");
	var stateChanges = [];
	stateChanges.push(change);
	while (q.length > 0) {
		var current = q.shift();
		var change = new StateChange();
        current.color = "red";
		change.addChangedNode(current, "red");
		if (current.id === goal.id){
			stateChanges.push(change);
            for (let node of this.nodes){
                node.visited = false;
                node.color = "yellow";
            }
			return stateChanges;
		}
		for (let neighbor of current.out_neighbors){
			if (neighbor.color === "yellow") {
				// set.add(neighbor);
				q.push(neighbor);
				// neighbor.parent = current;
                neighbor.color = "green";
				change.addChangedNode(neighbor, "green");
			}
		}
		stateChanges.push(change);
	}

	for (let node of this.nodes){
        node.color = "yellow";
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
                current.color = "red"
                if (current.id === goal.id) {
                        stateChanges.push(change);
                        for (let node of this.nodes){
                            node.color = "yellow";
                            node.visited = false;
                        }
                        return stateChanges;
                }
                if (!current.visited) {
                        current.visited = true;
                        for (let node of current.out_neighbors) {
                                if (node.color === "yellow"){
                                    stack.push(node);
                                    node.color = "green";
                                    change.addChangedNode(node, "green");
                                }
                        }
                }
                stateChanges.push(change);
        }

        for (let node of this.nodes){
            node.color = "yellow";
        }
        return stateChanges;
};

var x = new GraphCreator(true);
x.addNode("A0", 2, "yellow");
x.addNode("B1", 4, "yellow");
x.addNode("C2", 8, "yellow");
x.addNode("D3", 16, "yellow");
x.addNode("E4", 32, "yellow");
x.addNode("F5", 64, "yellow");
x.addNode("G6", 128, "yellow");
x.addNode("H7", 256, "yellow");
x.addNode("I8", 512, "yellow");
x.addNode("J9", 1024, "yellow");

x.addEdge(0, 2, 2);
x.addEdge(1, 3, 8);
x.addEdge(2, 5, 3);
x.addEdge(2, 6, 3);
x.addEdge(3, 7, 7);
x.addEdge(5, 7, 1);
x.addEdge(6, 8, 3);
x.addEdge(7, 9, 4);
// optimal 0 to 9 path
x.addEdge(0, 1, 1);
x.addEdge(1, 4, 1);
x.addEdge(4, 8, 1);
x.addEdge(8, 9, 1);

// console.log(x.nodes);
var changes = x.dfs(0, 9);

console.log(changes.length);

// console.log(x.nodes);

var changes_2 = x.dfs(0, 9);

console.log(changes_2.length);

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

module.exports = GraphCreator;
