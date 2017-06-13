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

   displayNewNodeModal: function(nodes, coords){
      var modal = document.getElementById('newNodeModal');
      modal.style.display = "block";
      this.nodes = nodes;
      this.newNodeCoords = coords;
   },

   submitNewNode: function(){
      var valueNewInputTag = document.getElementById("valueNewInput");
      var weightNewInputTag = document.getElementById("weightNewInput");
      var value = valueNewInputTag.value, weight = weightNewInputTag.value;

      if (value !== null){
         if(!value.match(/^[0-9a-zA-Z]+$/)){
            alert('Only use alphanumeric characters!');
            return false;
         }
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

      this.newNodeInfo = [weight, value, this.newNodeCoords];

      return true;
   },

   getNewNodeInfo: function(){
      return this.newNodeInfo;
   },

   promptNodeChanges: function(nodes, d){
      var modal = document.getElementById('nodeChangeModal');
      modal.style.display = "block";

      var valueInputTag = document.getElementById("valueChangeInput");
      var weightInputTag = document.getElementById("weightChangeInput");
      valueInputTag.value = d.value;
      weightInputTag.value = d.weight;
      this.nodes = nodes;
      this.nodeToChange = d;
   },

   promptEdgeChanges: function(links, d){
      var modal = document.getElementById('edgeChangeModal');
      modal.style.display = "block";

      var weightInputTag = document.getElementById("edgeWeightChangeInput");
      weightInputTag.value = d.weight;
      this.links = links;
      this.linkToChange = d;
   },

   getChangingEdge: function(){
      return this.linkToChange;
   },

   getNewWeight: function(){
      var weightNewInputTag = document.getElementById("edgeWeightChangeInput");
      var newWeight = weightNewInputTag.value;
      if(newWeight === "undefined") return undefined;
      if(isNaN(newWeight)) return null;
      return newWeight;
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
   },

   getChangingNodeID: function(){
      return this.nodeToChange.id;
   },

   getCredential: function(cred){
      var elem = document.getElementById(cred);
      if(elem === null || elem === undefined) return null;
      return elem.value;
   }
};
