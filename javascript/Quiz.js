"use strict";

var Node = require('./Node');
var Edge = require('./Edge');
var StateChange = require('./StateChange');
var GraphCreator = require('./GraphCreator');



/* console listener to get user input
var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then trim() 
    console.log("you entered: [" + 
        d.toString().trim() + "]");
  });
*/

function Quizzer(graph, state_changes) {
	this.num_nodes = 0;
	this.num_edges = 0;
	for(let node of graph.nodes.values()) {
		this.num_nodes++;
		for(let edge of node.out_edges.keys()) {
			this.num_edges++;
		}
	}
	if(!graph.is_directed) {
		this.num_edges/= 2;
	}
	this.graph = graph;

	// indices of state_change array which have node changes
	this.testable_indices = [];
	for(let i = 0; i < state_changes.length; i++) {
		if(Object.keys(state_changes[i].nodesChanged).length > 0) {
			this.testable_indices.push(i);
		}
	}
	this.changes = state_changes;

	console.log("testable: " + this.testable_indices);
	
}

Quizzer.prototype.check_nodes = function(index, user_input) {
	console.log(this.changes[index]);
	var nodes_changed = [];
	for(let key in this.changes[index].nodesChanged) {
		nodes_changed.push(parseInt(key));
	}
	// check for equal lengths
	if(user_input.length !== nodes_changed.length) return false;
	// sort arrays, then check for equality by iterating
	user_input.sort(function(x,y) {return x - y;});
	nodes_changed.sort(function(x,y) {return x - y;});

	for(let i = 0; i < user_input.length; i++) {
		if(user_input[i] !== nodes_changed[i]) return false;
	}

	return true;
};


let x_graph = new GraphCreator(false);

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

var states = x_graph.c_dijkstras(0);
var something = new Quizzer(x_graph, states);


var test_input = [4,3];
let asfd = something.check_nodes(6, test_input);
console.log(asfd);

//console.log(states);
