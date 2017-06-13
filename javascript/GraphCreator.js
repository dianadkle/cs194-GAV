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
    if (minvalue === Infinity) {
    	return -1;
    }
    this.array.delete(minindex);
    return minindex;
};

PriorityQueue.prototype.nonEmpty = function(){
    return this.array.size > 0;
};

// always create an empty graph
function GraphCreator(is_directed){
        // An undirected graph will only make use of the "out" Node fields
        if(is_directed === true) {
                this.directed = true;
        } else {
                this.directed = false;
        }
	// map: node ID -> node
this.nodes = new Map();
        this.currentID = 0;
        this.selectedNode = null;
};


// creates new node and adds it to graph
GraphCreator.prototype.addNode = function(value, weight, color = "yellow") {
	if(!/^[\w]+$/.test(value)) {
		console.log("Error: invalid node name (must consist of alphanumeric characters and underscores)");
		return;
	}
        var node_to_add = new Node(value, weight, color, this.currentID);
	this.nodes.set(this.currentID, node_to_add);
	this.currentID++;
	return node_to_add;
};

// remove node from graph by ID
GraphCreator.prototype.removeNode = function(id) {
        var to_remove = this.nodes.get(id);
        if (to_remove === undefined) {
                console.log("Error: node cannot be removed (does not exist)");
		return;
        }

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

	this.nodes.delete(id);
};


// return node given ID
GraphCreator.prototype.getNode = function(id) {
	return this.nodes.get(id);
};


// adds an edge: start node -> end node
GraphCreator.prototype.addEdge = function(start_id, end_id, weight, color) {
	var start_node = this.nodes.get(start_id);
	var end_node = this.nodes.get(end_id);
	if(start_node === undefined || end_node === undefined) {
		console.log("Error: adding edge to/from undefined node");
		return;
	}
        var new_edge = new Edge(start_node, end_node, weight, color);

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
GraphCreator.prototype.removeEdge = function(start_id, end_id) {
	var start_node = this.nodes.get(start_id);
        if(!start_node.out_edges.has(end_id)) {
                console.log("Error: edge cannot be removed (does not exist)");
                return;
        }
        var end_node = this.nodes.get(end_id);
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

// queue/stack to string
function qsToString(stack_array) {
	var retval = "";
	for (let i = 0; i < stack_array.length - 1; i++) {
		retval += stack_array[i].value + ", ";
	}
	if(stack_array.length > 0) {
		retval += stack_array[stack_array.length - 1].value;
	}
	return retval;
}

/* "Canonical" pseudocode
 * 1 stack.push(root)
 * 2 while (stack is not empty)
 * 3	current_node = stack.pop()
 * 4	if (current_node = goal_node) return
 * 5 	for (let n = unvisited neighbors of current_node): stack.push(n)
 */
GraphCreator.prototype.c_dfs = function(start_id, goal_id) {
	var start = this.nodes.get(start_id);
	var goal = this.nodes.get(goal_id);
        var stack = [];
        var stateChanges = [];

        stack.push(start);
        var change = new StateChange("stack");
        change.addChangedNode(start, "green");
	change.addComment("Pushing root node \"" + start.value + "\" to stack");
	change.lopc(1);
	change.struct(qsToString(stack));
        stateChanges.push(change);

	if(stack.length > 0) {
		change = new StateChange("stack");
		change.addComment("Stack size (" + stack.length + ") is greater than 0; execute loop");
		change.lopc(2);
		change.struct(qsToString(stack));
		stateChanges.push(change);
	} else {
		change = new StateChange("stack");
		change.addComment("Stack size is 0; end execution");
		change.lopc(2);
		change.struct(qsToString(stack));
		stateChanges.push(change);
	}

        while (stack.length > 0) {
                var current = stack.pop();
                change = new StateChange("stack");
                change.addChangedNode(current, "red");
		change.addComment("Popping node \"" + current.value + "\" from stack");
		change.lopc(3);
		change.struct(qsToString(stack));
		stateChanges.push(change);

                current.color = "red";
                if (current.id === goal.id) {
			change = new StateChange("stack");
			change.addComment("Goal node \"" + goal.value + "\" has been reached; end execution");
			change.lopc(4);
			change.struct(qsToString(stack));
                        stateChanges.push(change);
                        for (let node of this.nodes.values()){
	    		    node.visited = false;
                            node.color = "yellow";
                        }
                        return stateChanges;
                } else {
			change = new StateChange("stack");
			change.addComment("Goal node \"" + goal.value + "\" not reached; continue execution");
			change.lopc(4);
			change.struct(qsToString(stack));
                        stateChanges.push(change);
		}
                if (!current.visited) {
			change = new StateChange("stack");
                        current.visited = true;
			var num_added = 0;
                        for (let node of current.out_neighbors) {
                                if (node.color === "yellow") {
					num_added++;
					stack.push(node);
					node.color = "green";
					change.addChangedNode(node, "green");
				}
                        }
			change.addComment("Pushing " + num_added + " unvisited neighbor nodes to stack");
			change.lopc(5);
			change.struct(qsToString(stack));
                	stateChanges.push(change);
                }

		if(stack.length > 0) {
			change = new StateChange("stack");
			change.addComment("Stack size (" + stack.length + ") is greater than 0; execute loop");
			change.lopc(2);
			change.struct(qsToString(stack));
			stateChanges.push(change);
		} else {
			change = new StateChange("stack");
			change.addComment("Stack size is 0; end execution");
			change.lopc(2);
			change.struct(qsToString(stack));
			stateChanges.push(change);
		}
        }

        for (let node of this.nodes.values()){
            node.color = "yellow";
	    node.visited = false;
        }
        return stateChanges;
};

/* "Canonical" pseudocode
 * 1 queue.push(root)
 * 2 while (queue is not empty)
 * 3	current_node = queue.pop()
 * 4	if (current_node = goal_node) return
 * 5 	for (let n = unvisited neighbors of current_node): queue.push(n)
 */
GraphCreator.prototype.c_bfs = function(start_id, goal_id) {
	var q = [];
	var stateChanges = [];

	var start = this.nodes.get(start_id);
	var goal = this.nodes.get(goal_id);

	q.push(start);
	start.visited = true;

	var change = new StateChange("queue");
	change.addComment("Enqueuing root node \"" + start.value + "\"");
	change.addChangedNode(start, "green");
	change.lopc(1);
	change.struct(qsToString(q));
	stateChanges.push(change);

	if(q.length > 0) {
		change = new StateChange("queue");
		change.addComment("Queue size (" + q.length + ") is greater than 0; execute loop");
		change.lopc(2);
		change.struct(qsToString(q));
		stateChanges.push(change);
	} else {
		change = new StateChange("queue");
		change.addComment("Queue size is 0; end execution");
		change.lopc(2);
		change.struct(qsToString(stack));
		stateChanges.push(change);
	}

	while (q.length > 0) {
		var current = q.shift();
		change = new StateChange("queue");
        	current.color = "red";
		change.addChangedNode(current, "red");
		change.addComment("Dequeuing node \"" + current.value + "\"");
		change.lopc(3);
		change.struct(qsToString(q));
		stateChanges.push(change);


		if (current.id === goal.id){
			change = new StateChange("queue");
			change.addComment("Goal node \"" + goal.value + "\" has been reached; end execution");
			change.lopc(4);
			change.struct(qsToString(q));
			stateChanges.push(change);
            		for (let node of this.nodes.values()) {
	   			node.visited = false;
                		node.color = "yellow";
        		}
			return stateChanges;
		} else {
			change = new StateChange("queue");
			change.addComment("Goal node \"" + goal.value + "\" not reached; continue execution");
			change.lopc(4);
			change.struct(qsToString(q));
			stateChanges.push(change);
		}

		change = new StateChange("queue");
		var num_added = 0;
		for (let neighbor of current.out_neighbors) {
			if (neighbor.color === "yellow") {
				num_added++;
				q.push(neighbor);
                		neighbor.color = "green";
				change.addChangedNode(neighbor, "green");
			}
		}
		change.addComment("Enqueuing " + num_added + " unvisited neighbor nodes");
		change.lopc(5);
		change.struct(qsToString(q));
		stateChanges.push(change);

		if(q.length > 0) {
			change = new StateChange("queue");
			change.addComment("Queue size (" + q.length + ") is greater than 0; execute loop");
			change.lopc(2);
			change.struct(qsToString(q));
			stateChanges.push(change);
		} else {
			change = new StateChange("queue");
			change.addComment("Queue size is 0; end execution");
			change.lopc(2);
			change.struct(qsToString(stack));
			stateChanges.push(change);
		}
	}

	for (let node of this.nodes.values()){
	    	node.visited = false;
        	node.color = "yellow";
	}
	return stateChanges;
};

GraphCreator.prototype.dfs = function(start_id, goal_id){
	var start = this.nodes.get(start_id);
	var goal = this.nodes.get(goal_id);
        var stack = [];

        stack.push(start);
        var change = new StateChange();
        change.addChangedNode(start, "green");
        var stateChanges = [];
        stateChanges.push(change);

        while (stack.length > 0) {
                var current = stack.pop();
                change = new StateChange();
                change.addChangedNode(current, "red");
                current.color = "red";
                if (current.id === goal.id) {
                        stateChanges.push(change);
                        for (let node of this.nodes.values()){
	    		    node.visited = false;
                            node.color = "yellow";
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

        for (let node of this.nodes.values()){
            node.color = "yellow";
	    node.visited = false;
        }
        return stateChanges;
};

GraphCreator.prototype.bfs = function(start_id, goal_id){
	var q = [];

	var start = this.nodes.get(start_id);
	var goal = this.nodes.get(goal_id);

	q.push(start);
	start.visited = true;

	var change = new StateChange("queue");
	change.addChangedNode(start, "green");
	var stateChanges = [];
	change.struct(qsToString(q));
	stateChanges.push(change);
	while (q.length > 0) {
		var current = q.shift();
		change = new StateChange("queue");
        	current.color = "red";
		change.addChangedNode(current, "red");
		if (current.id === goal.id){
			change.struct(qsToString(q));
			stateChanges.push(change);
            for (let node of this.nodes.values()){
	    	node.visited = false;
                node.color = "yellow";
            }
			return stateChanges;
		}
		for (let neighbor of current.out_neighbors){
			if (neighbor.color === "yellow") {
				q.push(neighbor);
				// neighbor.parent = current;
                		neighbor.color = "green";
				change.addChangedNode(neighbor, "green");
			}
		}
		change.struct(qsToString(q));
		stateChanges.push(change);
	}

	for (let node of this.nodes.values()){
	    	node.visited = false;
        	node.color = "yellow";
	}
	return stateChanges;
};

function pqToString(graph, pq) {
	var retval = "";
	if(pq.array.size === 0) return retval;

	for(let key of pq.array.keys()) {
		retval += graph.nodes.get(key).value + ": ";
		retval += pq.array.get(key) + ", ";
	}

	return retval.slice(0, -2);
}

/* canonical pseudocode
 * 1 for every node, n, in graph:
 * 2	dist[n] = infnity;
 * 3	prev[n] = null
 * 4 distance[source] = 0
 * 5 for every node, n, in graph
 * 6	pq.enqueue(n, dist[n])
 * 7 while (pq is not empty)
 * 8	u = pq.dequeue()
 * 9	for each neighbor, v, of u
 * 10		if (dist[u] + dist(u,v) < dist[v])
 * 11			dist[v] = dist[u] + dist(u,v)
 * 12			prev[v] = u;
 */
GraphCreator.prototype.c_dijkstras = function(start_id){
	var dist = [];
	var prev = [];
	var q = new PriorityQueue();

	// initialize graph values
	dist[start_id] = 0;
	for (let node of this.nodes.values()) {
		if (node.id !== start_id) {
			dist[node.id] = Infinity;
			prev[node.id] = undefined;
		}
		q.insert(node.id, dist[node.id]);
	}

	var change = new StateChange("priority queue");
	change.addChangedNode(this.nodes.get(start_id), "green");
	change.addComment("Finished initialization");
	change.lopc("1-6");
	change.struct(pqToString(this, q));
	var stateChanges = [];
	stateChanges.push(change);

	if(q.nonEmpty()) {
		change = new StateChange("priority queue")
		change.addComment("Priority queue size (" + q.array.size + ") is greater than 0; execute loop");
		change.lopc(7);
		change.struct(pqToString(this, q));
		stateChanges.push(change);
	}

	while (q.nonEmpty()) {
		var current_id = q.extractMin();
		change = new StateChange("priority queue");
		change.lopc(8);
		change.struct(pqToString(this, q));
		if (current_id === -1){	// algorithm execution complete
			change.addComment("No reachable nodes left; end execution");
			stateChanges.push(change);
			break;
		}
		var cur_node = this.nodes.get(current_id);
		change.addChangedNode(cur_node, "red");
		change.addComment("Dequeuing node \"" + cur_node.value + "\" from priority queue");
		stateChanges.push(change);

		change = new StateChange("priority queue");
		for (let edge of cur_node.out_edges.values()) {
			var neighbor = edge.end;
			var alt = dist[current_id] + edge.weight;
			if (alt < dist[neighbor.id]) {
				dist[neighbor.id] = alt;
				if(prev[neighbor.id] !== undefined) {
					let old_edge = cur_node.out_edges.get(prev[neighbor.id]);
					change.addChangedEdge(old_edge, "blue");
				}
				prev[neighbor.id] = current_id;
				q.decreaseKey(neighbor.id, alt);
				change.changeNodeWeight(neighbor, alt);
				change.addChangedEdge(edge, "red");
			}
			change.addChangedNode(neighbor, "green");
		}
		change.lopc("9-12");
		change.struct(pqToString(this, q));
		change.addComment("Relaxing neighbor node distances");
		stateChanges.push(change);

		if(q.nonEmpty()) {
			change = new StateChange("priority queue")
			change.addComment("Priority queue size (" + q.array.size + ") is greater than 0; execute loop");
			change.lopc(7);
			change.struct(pqToString(this, q));
			stateChanges.push(change);
		}
	}
	for (let node of this.nodes.values()){
		node.color = "yellow";
	}
	return stateChanges;
};

GraphCreator.prototype.dijkstras = function(start_id){
    var dist = [];
    var prev = [];
    var q = new PriorityQueue();

    // initialize graph values
    dist[start_id] = 0;
    for (let node of this.nodes.values()) {
        if (node.id !== start_id) {
                dist[node.id] = Infinity;
                prev[node.id] = undefined;
        }
        q.insert(node.id, dist[node.id]);
    }

    var change = new StateChange("priority queue");
    change.addChangedNode(this.nodes.get(start_id), "green");
    var stateChanges = [];
    stateChanges.push(change);

    while (q.minimum()) {
        var current_id = q.extractMin();
	if (current_id === -1){
		break;
	}
	var cur_node = this.nodes.get(current_id);
        change = new StateChange("priority queue");
        change.addChangedNode(cur_node, "red");
        for (let edge of cur_node.out_edges.values()) {
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
    for (let node of this.nodes.values()){
        node.color = "yellow";
    }
    return stateChanges;
};



/*


//requires start_id and goal_id

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
};

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
};

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
};

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

 	var path = findPath(start, end, next);
 	for (var index = 0; index < path.length; index++) {
 		var nodeId = path[index];
 		var node = this.nodes[nodeId];

 		var change = new StateChange();
 		change.addChangedNode(node, "green");
 		stateChanges.push(change);

 		if (nodeId !== end) {
 			var nextNodeId = path[index+1];
 			change = new StateChange();
 			change.addChangedEdge(node.out_edges[nextNodeId], "green");
 			stateChanges.push(change);
 		}
 	}

 	return stateChanges;
};

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
}

GraphCreator.prototype.reverseDelete = function() {
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
   }
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
};
*/

// returns string representation of graph
GraphCreator.prototype.toString = function() {
   var str_rep = "";
   if (this.directed) {
      str_rep += "1\n";
   } else {
      str_rep += "0\n";
   }
   str_rep += this.currentID + "\n";

   // nodes
   str_rep += "---\n";
   var x = 0;
   for (let node of this.nodes.values()) {
      x++;
      str_rep += node.id + " " + node.value + " " + node.weight + " " + node.color + "\n";
   }

   str_rep += "---\n";

   // edge format: "start ID" "end ID" properties...
   for (let node of this.nodes.values()) {
      for (let edge of node.out_edges.values()) {
	 if(edge.visited) continue;	// only print edges one
         str_rep += edge.start.id + " " + edge.end.id + " " + edge.weight + " " + edge.color + "\n";
	 edge.visited = true;
      }
   }
   // reset
   for (let node of this.nodes.values()) {
      for (let edge of node.out_edges.values()) {
      	 edge.visited = false;
      }
   }
   return str_rep.slice(0, -1);
};

// constructs graph from string
GraphCreator.prototype.fromString = function(graph_str) {
	var strings = graph_str.split("\n---\n");
	// populate graph properties (directed, current ID)
	var graph_properties = strings[0].split("\n");
	if(parseInt(graph_properties[0]) === 1) {
		this.directed = true;
	} else {
		this.directed = false;
	}
	this.currentID = graph_properties[1];

	// initialize list as empty nodes
	this.nodes = new Map();

	// add nodes to graph
	var node_list = strings[1].split("\n");
	for (let node_str of node_list) {
		let node_split = node_str.split(" ");

		let id = parseInt(node_split[0]);
		let value = node_split[1];
		let weight = parseInt(node_split[2]);
		let color = node_split[3];
		let node_to_add = new Node(value, weight, color, id);
		this.nodes.set(id, node_to_add);
	}

	// add edges to graph
	var edge_list = strings[2].split("\n");
	for (let edge_str of edge_list) {
		let edge_split = edge_str.split(" ");

		let start_node_id = parseInt(edge_split[0]);
		let end_node_id = parseInt(edge_split[1]);
		let weight = parseInt(edge_split[2]);
		let color = edge_split[3];

		this.addEdge(start_node_id, end_node_id, weight, color);
	}

	this.selectedNode = null;
};

module.exports = GraphCreator;
/*
let x_graph = new GraphCreator(true);

x_graph.addNode("A0", 2, "yellow");
x_graph.addNode("B1", 4, "yellow");
x_graph.addNode("C2", 8, "yellow");
x_graph.addNode("D3", 16, "yellow");
x_graph.addNode("E4", 32, "yellow");
x_graph.addNode("F5", 64, "yellow");
x_graph.addNode("G6", 128, "yellow");

x_graph.addEdge(0, 1, 7, "blue");
x_graph.addEdge(0, 2, 9, "blue");

x_graph.addEdge(1, 4, 10, "blue");
x_graph.addEdge(1, 3, 15, "blue");

x_graph.addEdge(2, 5, 11, "blue");
x_graph.addEdge(2, 6, 2, "blue");

x_graph.addEdge(4, 5, 6, "blue");
x_graph.removeNode(2);

var graph_str = x_graph.toString();
console.log(graph_str);

console.log(x_graph.c_dijkstras(0));
*/
