'use strict';

//make sure graph has a directed boolean

function Edge(a, b){
   // if(a === b){
   //    ;//TODO: assert error
   // }
   this.a = a;
   this.b = b;
}


Edge.prototype.switchDirection = function(){
   // this.b = [this.a, this.a = this.b][0];
   var temp = this.a;
   this.a = this.b;
   this.b = temp;
};

Edge.prototype.getStartNode = function(){
   return this.a;
};

Edge.prototype.getEndNode = function(){
   return this.b;
};

Edge.prototype.getNodes = function(){
   return [this.a, this.b];
};
