'use strict';

function VirtualGraphManager(/* TODO: add arguments for VirtualGraphManager info */){
    this.nodes = [];
    this.edges = [];
    this.root = null;
    //this.
}

VirtualGraphManager.prototype.createGraph = function(root){
   if(root !== undefined){
      this.root = root;
   }
};
