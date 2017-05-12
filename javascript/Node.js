'use strict';
function Node(x, y, value, weight, color){
    this.x = x;
    this.y = y;
    this.value = value;
    this.weight = weight;
    this.color = color;
    this.intermediateValue = null;
    this.visited = false;
    this.starts = new Set([]);
    this.ends = new Set([]);
}

Node.prototype.getX = function(){
   return this.x;
};

Node.prototype.getY = function(){
   return this.y;
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

Node.prototype.setX = function(x){
   this.x = x;
};

Node.prototype.setY = function(y){
   this.y = y;
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

Node.prototype.connectFrom = function(previous){
   this.starts.add(previous);
};

Node.prototype.connectTo = function(next){
   this.ends.add(next);
};

Node.prototype.getPreviousNodes = function(){
   return Array.from(this.starts);
};

Node.prototype.getNextNodes = function(){
   return Array.from(this.ends);
};

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

Node.prototype.checkVisit = function(){
   return this.visited;
}

// clears all values relevant to algorithmic side of things
Node.prototype.algorithmReset = function(){
   this.visited = false;
   this.intermediateValue = null;
   this.weight = 0;
};
>>>>>>> c07a297939c63753ac4d4db8135705c25a619646
