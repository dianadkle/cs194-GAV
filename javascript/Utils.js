'use strict';

var Node = require('./Node');
var Edge = require('./Edge');
var StateChange = require('./StateChange');


module.exports = {
   initializeAlgorithmButtons: function(algorithms){
      var pTags = algorithms.map(function(algorithm){
         var elem = document.createElement('p');
         elem.className = "algorithm";
         elem.innerHTML = algorithm;
         return elem;
      });

      var algColumn = document.getElementById("algorithmsColumn");
      pTags.forEach(function(p){
         var tag = algColumn.appendChild(p);
         tag.onclick = function(){prepareAlgorithm(p.innerHTML)};
      });
   },

   getNodeIDByValue: function(val, nodes){
      return nodes.findIndex(
         node => node.value.toLowerCase() === val.toLowerCase()
      );
   },

   getStartAndGoalNodeIDs: function (nodes){
      var start = prompt("What is your start node?");
      if(start === null) return null;
      start = this.getNodeIDByValue(start, nodes);
      while(start === -1){
         start = prompt("That isn't a valid node.\nEnter a valid node to start from.");
         start = getNodeIDByValue(start, nodes);
         if(start === null) return null;
         start = getNodeIDByValue(start, nodes);
      }

      var goal = prompt("what is your goal node?");
      if(goal === null) return null;
      goal = getNodeIDByValue(goal, nodes);
      while(goal === -1){
         goal = prompt("That isn't a valid goal node.\nEnter a valid goal node.");
         if(goal === null) return null;
         goal = getNodeIDByValue(goal, nodes);
         while(start === goal){
            goal = prompt("Please choose a goal node that's different from the start node.");
            if(goal === null) return null;
            goal = getNodeIDByValue(goal, nodes);
         }
      }
      return [start, goal];
   },

   getWeightValueNewNode: function(nodes){
      var valuePromptStr = "Please enter your node's value. ";
         valuePromptStr += "\nThis could be a number, name, etc.";
      var weightPromptStr = "Please enter your node's weight. ";
         weightPromptStr += "\nSet this to 0 if your graph doesn't consider node weights.";

      var value = prompt(valuePromptStr);
      if (value === null) return null;
      var nodeID = this.getNodeIDByValue(value, nodes);
      while(nodeID !== -1){
         value = prompt("That value is already taken. Please enter a different value.");
         if(value === null) return null;
         nodeID = this.getNodeIDByValue(value, nodes);
      }

      var weight = prompt(weightPromptStr);
      if (weight === null) return null;
      while(isNaN(weight)){
         weight = prompt("Please enter a valid number for a weight.");
         if (weight === null) return null;
      }
      return [weight, value];
   }
};
