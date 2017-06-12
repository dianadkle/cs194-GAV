"use strict";
/*jslint node: true */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/userDB');
// mongoose.connect('mongodb://127.0.0.1/userDB');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Connected");
});


var Node = require('./Node');
var Edge = require('./Edge');
var Graph = require('./GraphCreator')

var g = new Graph();
g.addNode('0', 3, 'yellow');

var User = require('./userSchema');
var NodeDB = require('./nodeSchema');
var EdgeDB = require('./edgeSchema');

var crypto = require('crypto');

function returnHMACSHA1(password) {
	var secret    = 'egoeij3g'; //make this your secret!!
	var algorithm = 'sha1';   //consider using sha256
	var hash, hmac;
	hmac = crypto.createHmac(algorithm, secret);    
	hmac.write(password); // write in to the stream
	hmac.end();       // can't read from the stream until you call end()
	hash = hmac.read().toString('hex');    // read out hmac digest
	return hash;
}

function loginUser(user_name, password) {
	var query = { username: user_name };
	User.findOne(query, function (err, user) {
		if (user === null) {
			console.log('User not found.');
			return null;
		}
		if (returnHMACSHA1(password).localeCompare(user.password) === 0) {
			return user;
		}
		else {
			console.log('Incorrect password.');
			return null;
		}
	});
}

function addUser(user_name, pass_word) {
	var query = { 'username': user_name };
	User.findOne(query, function (err, docs) {
		if (docs !== null) {
			console.log('Username already taken.');
			return;
		}
	});

	var newUser = new User({
		first_name: '',
	    last_name: '',
	    description: '',
	    username: user_name,
	    password: returnHMACSHA1(pass_word),
	    salt: '',
	    graphs: []
	});

	console.log("1");
	newUser.save(function(err) {
		if (err) {
			console.log(err);
		}
		console.log("2");
		console.log('User saved.');
		User.findOne(query, function (err, user) {
			console.log(user);
		})
	});
	console.log("3");
}

function deleteUser(user_name) {
	var query = { 'username': user_name };
	User.findOneAndRemove(query, function (err, user) {
		if (err) throw err;

		if (user) {
			console.log(user);
			console.log('User deleted.');
		}
		else {
			console.log('User not found.');
		}
	});
}

function updateUser(user_name, update) {
	var query = { 'username': user_name };
	console.log(update);
	console.log(update.get("first_name"));
	User.findOne(query, function (err, user) {
		if (err) throw err;
		user.first_name = update.get("first_name");
    	user.last_name = update.get("last_name");
    	user.description = update.get("description");
    	user.password = returnHMACSHA1(update.get("password"));

    	user.save(function(err) {
			if (err){
				console.log(err);
			}
			// User.findOne(query, function (err, user) {
			// 	console.log(user);
			// })
			console.log('User updated.');
		});
	});
}

function saveGraph(user_name, nodes) {

	var query = { username: user_name };
	User.findOne(query, function (err, user) {
		if (err) throw err;
		var nodesDB = [];

		var node;
		nodes.forEach(function(value, key, map) {
			// console.log(key);
		    node = value;
		    nodesDB.push(convertNodeToNodeDB(node));
		});
		// console.log('hi');
		user.graphs.push(nodesDB);
		// console.log(nodesDB);
		user.markModified('graphs');

    	user.save(function(err) {
			if (err) throw err;
			// User.findOne(query, function (err, user) {
			// 	console.log(user.graphs[0]);
			// })
			console.log('Graph saved.');
		});
	});
}

function loadGraph(user_name, index) {
	var query = { username: user_name };
	User.findOne(query, function (err, user) {
		if (err) throw err;

		var graph = user.graphs[index];
		// console.log(graph);
		var nodes = new Map([]);

		for (var i = 0; i < graph.length; i++) {
			var nodeDB = graph[i];
			var node = convertNodeDBtoNode(nodeDB);
			nodes.set(node.id, node);
		}
		updateNodes(nodes, graph);
		// console.log(nodes);
		return nodes;
	});
}

function convertNodeToNodeDB(node) {
	var newNode = new NodeDB({
		value: node.value, 
    	id: node.id,  
	    weight: node.weight, 
	    color: node.color,    
	    intermediateValue: node.intermediateValue,
	    visited: node.visited,
	    in_neighbors: nodesToIds(node.in_neighbors),
	    out_neighbors: nodesToIds(node.out_neighbors),
	    in_edges: edgesToIds(node.in_edges, true),
	    out_edges: edgesToIds(node.out_edges, false),
	    // parent: node.parent.id
	});

	return newNode;
}

function convertNodeDBtoNode(nodeDB) {
	var newNode = new Node(nodeDB.value, nodeDB.weight, nodeDB.color, nodeDB.id);
	newNode.intermediateValue = nodeDB.intermediateValue;
	newNode.visited = nodeDB.visited;

	return newNode;
}

function updateNodes(nodes, graph) {
	for (var newNode in nodes) {
		var id = newNode.id;

		newNode.in_neighbors = idsToNodes(graph[id].in_neighbors);
		newNode.out_neighbors = idsToNodes(graph[id].out_neighbors);
		newNode.in_edges = idsToEdges(nodes, newNode.id, graph[id].in_edges, true);
		newNode.out_edges = idsToEdges(nodes, newNode.id, graph[id].out_edges, false);
		newNode.parent = nodes.get(graph[id].parent);
	}
}

function nodesToIds(nodes) {
	var nodeIds = [];
	for (var node in nodes) {
		nodeIds.push(node.id);
	}
	return nodeIds;
}

function idsToNodes(nodesDB, nodes) {
	var neighbors = new Set([]);

	for (var nodeID in nodesDB) {
		neighbors.add(nodes.get(nodeID));
	}

	return neighbors;
}

function edgesToIds(edges, isInEdge) {
	var edgeIds = [];

	for (var nodeId in edges) {
		var edge = edges[nodeId];
		var id = isInEdge ? edge.start.id : edge.end.id;

		var newEdge = new EdgeDB({
			start: edge.start.id, 
		    end: edge.end.id,  
		    weight: edge.weight, 
		    color: edge.color,
		});

		edgeIds.push([ id, newEdge ]);
	}

	return edgeIds;
}

function idsToEdges(nodes, id, edgesDB, isInEdge) {
	var edges = new Map([]);

	for (var elem in edgesDB) {
		var edgeID = elem[0];
		var edgeDB = elem[1];

		var start = isInEdge ? edgeID : id;
		var end = isInEdge ? id : edgeID;
		var key = isInEdge ? start : end;
		
		var edge;
		if (isInEdge && (nodes.get(key).out_edges.get(id) !== undefined)) {
				edge = nodes.get(key).out_edges.get(id);
		}
		else if (nodes.get(key).in_edges.get(id) !== undefined) {
			edge = nodes.gett(key).in_edges.get(id);
		}
		else {
			edge = new Edge(start, end, edgeDB.weight, edgeDB.color);
		}
		
		edges.set(key, edge);
	}

	return edges;
}

function test(){
	// g.addNode('1', 4, 'yellow');
	// g.addEdge(0, 1, 1, 'red');
	console.log(g.nodes);
	saveGraph('diana', g.nodes);
}
// deleteUser('diana');
// var g = new Graph();
// g.addNode('0', 3, 'yellow');
// g.addNode('1', 4, 'yellow');
// g.addEdge(0, 1, 1, 'red');
// test()
// var nodes = loadGraph('diana', 0);
// console.log(nodes);
// deleteUser('diana');
// deleteUser('diana');
// deleteUser('diana');
// deleteUser('diana');
// deleteUser('diana');
// addUser('diana', 'blah');

// var query = { 'username': 'diana' };
// var changes = new Map([]);
// changes.set("first_name", "Diana");
// updateUser('diana', changes);
