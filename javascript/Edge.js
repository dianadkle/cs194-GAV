'use strict';

function Edge(start, end, weight){
   // if(a === b){
   //    ;//TODO: assert error
   // }
   this.start = start;
   this.end = end;
   this.weight = weight;
}

// NOTE: the switchDirection operation is local to the edge structure.
// In particular, this does not change the lists in which this edge apears,
// so the edge must be swapped in any in/out lists it appears in
Edge.prototype.switchDirection = function(){
   var temp = this.start;
   this.start = this.end;
   this.end = temp;
};
