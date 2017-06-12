'use strict';

function SideBarController(algorithms){
   this.algorithms = algorithms;
};

function createAlgorithmButtons(algorithms){
   var algOpenTag = "<p class='algorithm'>";
   var algCloseTag = "</p>"
   algorithms.map(function(algorithm){
      var elem = algOpenTag + algorithm + algCloseTag;
      $('#algorithmsRow').append(elem);
   });
}

SideBarController.prototype.control = function(){
   createAlgorithmButtons(this.algorithms);

};

module.exports = SideBarController;
