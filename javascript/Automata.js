"use strict";

var Viz = require("viz.js");
// always create an empty graph
function Automata(regex){
	console.log("Created Automata object");
	
	this.regex = regex;
	this.nfa = null;
	this.dfa = null;

}

//DFA and NFAs are returned in a FSM json object  as defined below:
// {
//   initialState: 'id',
//   acceptState: ['id', ... ] ,
//   numOfStates: Integer,
//   type: 'DFA' or 'NFA',
//   transitions: {
//     'id': { 'to_id': label, },
//     ...,
//   }

Automata.prototype.convertToNFA = function() {
	var regParser = require('automata.js');
	var parser = new regParser.RegParser(this.regex);

	var nfa = parser.parseToNFA();

	this.nfa = nfa;

	// console.log(nfa);

	return nfa;
};


Automata.prototype.convertToDFA = function() {
	var regParser = require('automata.js');
	var parser = new regParser.RegParser(this.regex);

	var dfa = parser.parseToDFA();

	this.dfa = dfa;

	// console.log(dfa);

	return dfa;
	
};

Automata.prototype.stringMatches = function(text) {
	if (this.dfa === null){
		this.convertToDFA();
	}
	return this.dfa.match(text);
};

// var x = new Automata("a*b");

// var nfa = x.convertToDFA();
// console.log(x.stringMatches("ab"));

// var result = Viz(nfa.toDotScript(), 'svg', 'dot');



// console.log(nfa);


