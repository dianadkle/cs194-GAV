'use strict';

var Node = require('./Node');
var Edge = require('./Edge');
var StateChange = require('./StateChange');


module.exports = {
   getNodeIDByValue: function(val, nodes){
      return nodes.findIndex(
         node => node.value.toLowerCase() === val.toLowerCase()
      );
   },

   promptAlgorithmInputs: function(){
      var modal = document.getElementById('algorithmModal');
      modal.style.display = "block";

      var startInputTag = document.getElementById("startNodeInput");
      var goalInputTag = document.getElementById("goalNodeInput");
   },

   getStartAndGoalNodeIDs: function (nodes){
      var startInput = document.getElementById("startNodeInput").value;
      var goalInput = document.getElementById("goalNodeInput").value;

      if(startInput === null || startInput === undefined
         || goalInput === null || goalInput === undefined) return "EMPTY_VALUES";

      var start = this.getNodeIDByValue(startInput, nodes);
      var goal = this.getNodeIDByValue(goalInput, nodes);

      if(start === -1 || goal === -1) return "NONEXISTENT_VALUES";
      if (start === goal) return "SAME_VALUES";

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
   },

   promptNodeChanges: function(nodes, d){
      var modal = document.getElementById('nodeModal');
      modal.style.display = "block";

      var valueInputTag = document.getElementById("valueChangeInput");
      var weightInputTag = document.getElementById("weightChangeInput");
      valueInputTag.value = d.value;
      weightInputTag.value = d.weight;
      this.nodes = nodes;
      this.nodeToChange = d;
   },

   submitNodeChanges: function(value, weight){
      if (value !== null && value !== this.nodeToChange.value){
         var nodeID = this.getNodeIDByValue(value, this.nodes);
         if(nodeID !== -1){
            alert("That value is already taken. Please enter a different value.");
            return false;
         }
      }

      if (isNaN(weight) && weight !== null && weight !== undefined){
            alert("Please enter a valid number for a weight.");
            return false;
      }

      var index = this.nodes.findIndex(node => node.id === this.nodeToChange.id);
      if(value !== null && value !== undefined){
         this.nodes[index].value = value;
      }
      if(weight !== null && weight !== undefined){
         this.nodes[index].weight = weight;
      }
      return true;
   }
};
