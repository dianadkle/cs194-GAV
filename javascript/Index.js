'use strict';

var GraphSVGHandler = require('./GraphSVGHandler');
var AutomataVisualizer = require('./AutomataVisualizer');
var TemplateExtractor = require('./TemplateExtractor');
var Templates = new TemplateExtractor();
var DOMParser = require('xmldom').DOMParser;
var domParser = new DOMParser();
var Utils = require('./Utils');
/***********************************Index.js***********************************/


function Index(){
   var docBody = document.getElementsByTagName("body")[0];
   var algorithms = [
      "Depth-First Search",
      "Breadth-First Search",
      "Dijkstra's Algorithm"
   ];
   var user_name = null;

   /*templates*/
   var graphCanvasTemplate = Templates.getTemplate('GraphCanvas');
   var loginTemplate = Templates.getTemplate('Login');
   var registerTemplate = Templates.getTemplate('Register');

   //template HTML
   var graphCanvasHTML = graphCanvasTemplate({});
   var loginHTML = loginTemplate({});

   /* add button resizing function */
   function resizeButtons(){
      if(user_name !== null){
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
      } else {
         //TODO: fix buttons for logging in/registering
      }
   }

   //resize
   window.addEventListener("resize", resizeButtons, false);

   //GraphCanvas Rendering stuff
   Index.prototype.renderGraphCanvas = function(/*TODO: add credentials*/){
      docBody.innerHTML = graphCanvasTemplate({});
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

      var initializeAutomataSVG = function(automata_type){
         var aut_id = (automata_type === "NFA") ? "NfaSVG" : "DfaSVG";
         var cell = document.getElementById(aut_id);
         var svgXML = automataVisualizer.generateNFA();
         var doc = domParser.parseFromString(svgXML);
         var svg = doc.getElementsByTagName('svg')[0];

         cell.setAttribute("width", svg.getAttribute("width"));
         cell.setAttribute("height", svg.getAttribute("height"));
         cell.innerHTML = svg.getElementsByTagName("g")[0].toString();
      };

      var initializeNodeModals = function(){
         var modal = document.getElementById('nodeModal');
         var modalX = document.getElementsByClassName("modalClose")[0];
         modalX.onclick = function() {
            modal.style.display = "none";
         }

         // When the user clicks anywhere outside of the modal, close it
         window.onclick = function(event) {
            if (event.target === modal) {
               modal.style.display = "none";
            }
         }
         var valueInputTag = document.getElementById("valueChangeInput");
         var weightInputTag = document.getElementById("weightChangeInput");

         var submitChangeButton = document.getElementById("submitNodeChange");
         submitChangeButton.onclick = function(){
            if(Utils.submitNodeChanges(valueInputTag.value, weightInputTag.value)){
               modal.style.display = "none";
               graphSVGHandler.updateCanvas();
            }
         };
      };

      var initializeAlgorithmModals = function(){
         var modal = document.getElementById('algorithmModal');

         var modalX = document.getElementsByClassName("modalClose")[1];
         modalX.onclick = function() {
            modal.style.display = "none";
         }

         // When the user clicks anywhere outside of the modal, close it
         window.onclick = function(event) {
            if (event.target === modal) {
               modal.style.display = "none";
            }
         }
         var startInputTag = document.getElementById("startNodeInput");
         var goalInputTag = document.getElementById("goalNodeInput");

         var runAlgorithmButton = document.getElementById("runAlgorithmButton");
         runAlgorithmButton.onclick = function(){
            if(graphSVGHandler.runAlgorithm()){
               modal.style.display = "none";
               graphSVGHandler.updateCanvas();
               startInputTag.value = "";
               goalInputTag.value = "";
            }
         };
      };


      //initialize buttons, togglers, and other things
      initializeForwardReverseButtons();
      intializeDirectedToggler();
      initializeAutomataSVG("DFA");
      initializeAutomataSVG("NFA");
      resizeButtons();

      initializeNodeModals();
      initializeAlgorithmModals();
   };

   Index.prototype.renderLogin = function(){
      var index = this;
      docBody.innerHTML = loginTemplate({});
      document.getElementById("switchToRegister").onclick = function(){
            index.renderRegister();
      };
      document.getElementById("login").onclick = function(){
         index.renderGraphCanvas(/*TODO: add credentials*/);
      }
   };

   //GraphCanvas Rendering stuff
   Index.prototype.renderRegister = function(){
      var index = this;
      docBody.innerHTML = registerTemplate({});
      document.getElementById("switchToLogin").onclick = function(){
         index.renderLogin();
      };
      document.getElementById("register").onclick = function(){
         //TODO: check registration credentials
      };
   };
};

window.onload = function(){
   var index = new Index();
   index.renderLogin();
};
