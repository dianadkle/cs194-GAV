'use strict';

function Edge(from, to){
   // if(a === b){
   //    ;//TODO: assert error
   // }
   this.from = from;
   this.to = to;
}

// NOTE: the switchDirection operation is local to the edge structure.
// In particular, this does not change the lists in which this edge apears,
// so the edge must be swapped in any in/out lists it appears in
Edge.prototype.switchDirection = function(){
   var temp = this.from;
   this.from = this.to;
   this.to = temp;
};
