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

   var initializeForwardReverseButtons = function(){
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
   };

   var intializeDirectedToggler = function(){
      var directionToggler = document.getElementById("directionToggler");
      var directionText = document.getElementById("toggledText");
      directionToggler.onclick = function(){
         if(canvasSVGHandler.toggleDirection()){
            directionText.innerHTML = "directed";
            directionText.style.color = "#2196F3";
            directionText.style.left = "94.8%";
         } else {
            directionText.innerHTML = "undirected";
            directionText.style.color = "#ccc";
            directionText.style.left = "94%";
         }
      }

   };

   initializeForwardReverseButtons();
   intializeDirectedToggler();
   resizeButtons();

};

function resizeButtons(){
   var reverseButton = document.getElementById("reverseButton");
   var clearButton = document.getElementById("clearButton");
   var forwardButton = document.getElementById("forwardButton");
   var directionToggler = document.getElementById("directionToggler").parentElement;
   var directionText = document.getElementById("toggledText");
   reverseButton.style.position = "absolute";
   clearButton.style.position = "absolute";
   forwardButton.style.position = "absolute";
   directionToggler.style.position = "absolute";
   reverseButton.style.top = "75%";
   clearButton.style.top = "75%";
   forwardButton.style.top = "75%";
   directionToggler.style.top = "78%";
   directionText.style.top = "79%";
   reverseButton.style.left = "25%";
   clearButton.style.left = "30%";
   forwardButton.style.left = "35%";
   directionToggler.style.left = "95%";
   directionText.style.left = "94%";
}


window.addEventListener("resize", resizeButtons, false);
