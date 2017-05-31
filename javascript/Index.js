'use strict';

var GraphSVGHandler = require('./GraphSVGHandler');
var AutomataVisualizer = require('./AutomataVisualizer');
var DOMParser = require('xmldom').DOMParser;
var domParser = new DOMParser();
/***********************************Index.js***********************************/

var algorithms = [
   "Depth-First Search",
   "Breadth-First Search",
   "Dijkstra's Algorithm"
];

var radius = 20;

window.onload = function(){
   var graphSVGHandler = new GraphSVGHandler(algorithms);
   var automataVisualizer = new AutomataVisualizer("a*b");

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

   var initializeDfaSVG = function(){
      var cell = document.getElementById("DfaSVG");
      var svgXML = automataVisualizer.generateDFA();
      var doc = domParser.parseFromString(svgXML);
      var svg = doc.getElementsByTagName('svg')[0];
      window.svgg = svg;
      cell.setAttribute("width", svg.getAttribute("width"));
      cell.setAttribute("height", svg.getAttribute("height"));
      cell.innerHTML = svg.getElementsByTagName("g")[0].toString();
   };

   var initializeNfaSVG = function(){
      var cell = document.getElementById("NfaSVG");
      var svgXML = automataVisualizer.generateNFA();
      var doc = domParser.parseFromString(svgXML);
      var svg = doc.getElementsByTagName('svg')[0];

      cell.setAttribute("width", svg.getAttribute("width"));
      cell.setAttribute("height", svg.getAttribute("height"));
      cell.innerHTML = svg.getElementsByTagName("g")[0].toString();
   };


   //initialize buttons, togglers, and other things
   initializeForwardReverseButtons();
   intializeDirectedToggler();
   initializeDfaSVG();
   initializeNfaSVG();
   resizeButtons();

};


/* add button resizing function */
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

/* add event listener for resizing window */
window.addEventListener("resize", resizeButtons, false);
