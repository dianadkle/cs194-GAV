'use strict';

var regParser = require('automata.js');
var Viz = require('Viz.js');

function AutomataVisualizer(regex){
   this.regex = regex;
   var parser;

   AutomataVisualizer.prototype.setRegEx = function(newRegex){
      this.regex = newRegex;
   };

   AutomataVisualizer.prototype.generateNFA = function(){
      parser = new regParser.RegParser(this.regex);
      var nfa = parser.parseToNFA();
      return Viz(nfa.toDotScript(), 'svg', 'dot');
   };

   AutomataVisualizer.prototype.generateDFA = function(){
      parser = new regParser.RegParser(this.regex);
      var dfa = parser.parseToDFA();
      return Viz(dfa.toDotScript(), 'svg', 'dot');
   };
};


module.exports = AutomataVisualizer;
