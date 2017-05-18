'use strict';
function Node(value, weight, color, id){
    this.value = value;
    this.id = id;
    this.weight = weight;
    this.color = color;
    this.intermediateValue = null;
    this.visited = false;
    this.neighbors = new Set([]);
    this.parent = null;
}

Node.prototype.getID = function(){
  return this.id;
};

Node.prototype.getWeight = function(){
   return this.weight;
};

Node.prototype.getValue = function(){
   return this.value;
};

Node.prototype.getColor = function(){
   return this.color;
};

Node.prototype.setValue = function(value){
   this.value = value;
};

Node.prototype.setWeight = function(weight){
   this.weight = weight;
};

Node.prototype.setColor = function(color){
   this.color = color;
};

Node.prototype.addNeighbor = function(id){
  this.neighbors.add(id);
};

Node.prototype.removeNeighbor = function(id){
  if (this.neighbors.has(id)){
    this.neighbors.delete(id)
  } else {
    console.log("that neighbor does not exist for that node");
  }
};

Node.prototype.getNeighbors = function(id){
  return this.neighbors;
}
// Node.prototype.connectFrom = function(previous){
//    this.starts.add(previous);
// };

// Node.prototype.connectTo = function(next){
//    this.ends.add(next);
// };

// Node.prototype.getPreviousNodes = function(){
//    return Array.from(this.starts);
// };

// Node.prototype.getNextNodes = function(){
//    return Array.from(this.ends);
// };

/* Functions for algorithm execution usage */
Node.prototype.setIntermediateValue = function(intermediateValue){
   this.intermediateValue = intermediateValue;
};

Node.prototype.getIntermediateValue = function(){
   return this.intermediateValue;
};

Node.prototype.clearIntermediateValue = function(){
   this.intermediateValue = null;
};

Node.prototype.visit = function(){
   this.visited = true;
};

Node.prototype.unvisit = function(){
   this.visited = false;
};

Node.prototype.isVisited = function(){
   return this.visited;
};

Node.prototype.setParent = function(node){
  this.parent = node;
};

Node.prototype.getParent = function(){
  return this.parent;
};

// clears all values relevant to algorithmic side of things
Node.prototype.algorithmReset = function(){
   this.visited = false;
   this.intermediateValue = null;
   this.weight = 0;
};
