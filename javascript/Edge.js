'use strict';

//make sure graph has a directed boolean

function Edge(start, end, id){
   // if(a === b){
   //    ;//TODO: assert error
   // }
   this.id = id;
   this.start = start;
   this.end = end;
}

Edge.prototype.getID = function(){
   return this.id;
};

Edge.prototype.switchDirection = function(){
   // this.b = [this.a, this.a = this.b][0];
   var temp = this.a;
   this.a = this.b;
   this.b = temp;
};

Edge.prototype.getStartNode = function(){
   return this.start;
};

Edge.prototype.getEndNode = function(){
   return this.end;
};

Edge.prototype.getNodes = function(){
   return [this.start, this.end];
};
