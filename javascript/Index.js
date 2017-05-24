'use strict';

var CanvasSVGHandler = require('./CanvasSVGHandler');

/***********************************Index.js***********************************/

var algorithms = [
   "Depth-First Search",
   "Breadth-First Search",
   "Dijkstra's Algorithm"
];

var radius = 20;

window.onload = function(){
   var canvasSVGHandler = new CanvasSVGHandler(algorithms);
   var nextStepButton = document.getElementById("nextStepButton");
   nextStepButton.onclick = function(){
      if (canvasSVGHandler.getCurrentAlgorithm() === null){
         //TODO: display error message about clicking algorithm
      } else {
         var runNextStep = canvasSVGHandler.runNextAlgorithmStep();
         if(runNextStep === 'FAILURE'){
            //TODO: display error about reaching end of algorithm
         }
      }
   };
}
