"use strict";

// always create an empty graph
function Automata(regex){
	console.log("Created Automata object");
	// a removed node will be replaced by the value -1
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
}

Automata.prototype.convertToNFA = function() {
	var regParser = require('automata.js');
	var parser = new regParser.RegParser(this.regex);

	var nfa = parser.parseToNFA();

	this.nfa = nfa;

	console.log(nfa);

	return nfa;
};


Automata.prototype.convertToDFA = function() {
	var regParser = require('automata.js');
	var parser = new regParser.RegParser(this.regex);

	var dfa = parser.parseTODFA();

	this.dfa = dfa;

	console.log(dfa);

	return dfa;
	
};

// IN ORDER TO USE THIS FUNCTION, YOU MUST FIRST CONVERT THE REGEX TO A DFA
Automata.prototype.stringMatches = function(text) {
	return this.dfa.match(text);
};


