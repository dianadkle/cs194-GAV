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
   initializeForwardReverseButtons();


   function initializeForwardReverseButtons(){
      var reverseButton = document.getElementById("reverseButton");
      var clearButton = document.getElementById("clearButton");
      var forwardButton = document.getElementById("forwardButton");

      reverseButton.onclick = function(){
         var runPreviousStep = canvasSVGHandler.runPreviousAlgorithmStep();
         if(runPreviousStep === 'FAILURE'){
            alert("You haven't selected an algorithm to run");
         } else if (runPreviousStep === 'END'){
            alert("You've reached the first step of the algorithm");
         }
      };

      clearButton.onclick = function(){
         canvasSVGHandler.clearAlgorithm();
      };

      forwardButton.onclick = function(){
         var runNextStep = canvasSVGHandler.runNextAlgorithmStep();
         if(runNextStep === 'FAILURE'){
            alert("You haven't selected an algorithm to run");
         } else if(runNextStep === 'END'){
            alert("You've already reached the last step of the algorithm");
         }
      };
      reverseButton.style.position = "absolute";
      clearButton.style.position = "absolute";
      forwardButton.style.position = "absolute";
      reverseButton.style.top = "575px";
      clearButton.style.top = "575px";
      forwardButton.style.top = "575px";
      reverseButton.style.left = "300px";
      clearButton.style.left = "375px";
      forwardButton.style.left = "450px";
   }
}
