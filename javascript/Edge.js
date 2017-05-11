'use strict';

function Edge(a, b, directed){
   // if(a === b){
   //    ;//TODO: assert error
   // }
   this.directed = directed;
   this.a = a;
   this.b = b;
}

Edge.prototype.checkDirected = function(){
   return this.directed;
};

Edge.prototype.switchDirection = function(){
   var temp = this.a;
   this.a = this.b;
   this.b = temp;
};

Edge.prototype.getStartNode = function(){
   if(this.directed){
      return a;
   }
   else {
      return null;
   }
};

Edge.prototype.getEndNode = function(){
   if(this.directed){
      return b;
   }
   else {
      return null;
   }
};

Edge.prototype.getNodes = function(){
   return [a, b];
};
