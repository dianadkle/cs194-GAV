'use strict';

var GraphSVGHandler = require('./GraphSVGHandler');

/***********************************Index.js***********************************/

var algorithms = [
   "Depth-First Search",
   "Breadth-First Search",
   "Dijkstra's Algorithm"
];

var radius = 20;

window.onload = function(){
   var graphSVGHandler = new GraphSVGHandler(algorithms);

   var initializeForwardReverseButtons = function(){
      var reverseButton = document.getElementById("reverseButton");
      var clearButton = document.getElementById("clearButton");
      var forwardButton = document.getElementById("forwardButton");

      reverseButton.onclick = function(){
         var runPreviousStep = graphSVGHandler.runPreviousAlgorithmStep();
         if(runPreviousStep === 'FAILURE'){
            alert("You haven't selected an algorithm to run");
         } else if (runPreviousStep === 'END'){
            alert("You've reached the first step of the algorithm");
         }
      };

      clearButton.onclick = function(){
         graphSVGHandler.clearAlgorithm();
      };

      forwardButton.onclick = function(){
         var runNextStep = graphSVGHandler.runNextAlgorithmStep();
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
         if(graphSVGHandler.toggleDirection()){
            directionText.innerHTML = "directed";
            directionText.style.color = "#2196F3";
            directionText.style.left = "84%";
         } else {
            directionText.innerHTML = "undirected";
            directionText.style.color = "#ccc";
            directionText.style.left = "83%";
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
   reverseButton.style.top = "85%";
   clearButton.style.top = "85%";
   forwardButton.style.top = "85%";
   directionToggler.style.top = "88%";
   directionText.style.top = "90%";
   reverseButton.style.left = "1%";
   clearButton.style.left = "11%";
   forwardButton.style.left = "21%";
   directionToggler.style.left = "85%";
   directionText.style.left = "83%";
}


window.addEventListener("resize", resizeButtons, false);
