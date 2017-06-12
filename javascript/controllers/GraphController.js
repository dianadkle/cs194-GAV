'use strict';

var Utils = require('../Utils');
var GraphSVGHandler = require('../GraphSVGHandler');
var AutomataVisualizer = require('../AutomataVisualizer');

function GraphController(userInfo){
   this.userInfo = userInfo;
};

GraphController.prototype.control = function(){
   var graphSVGHandler = new GraphSVGHandler();
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
      var directionText = document.getElementById("directionText");
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

   var initializeNodeModals = function(){
      var nodeChangeModal = document.getElementById('nodeChangeModal');
      var newNodeModal = document.getElementById('newNodeModal');
      var edgeChangeModal = document.getElementById('edgeChangeModal');
      var nodeChangeModalX = document.getElementsByClassName("modalClose")[0]
      var newNodeModalX = document.getElementsByClassName("modalClose")[1];
      var edgeChangeModalX = document.getElementsByClassName("modalClose")[3];

      nodeChangeModalX.onclick = function() {
         nodeChangeModal.style.display = "none";
      };
      newNodeModalX.onclick = function() {
         newNodeModal.style.display = "none";
      };
      edgeChangeModalX.onclick = function(){
         edgeChangeModal.style.display = "none";
      }

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
         if (event.target === modal) {
            nodeChangeModal.style.display = "none";
            newNodeModal.style.display = "none";
         }
      };
      var valueChangeInputTag = document.getElementById("valueChangeInput");
      var weightChangeInputTag = document.getElementById("weightChangeInput");

      var submitChangeButton = document.getElementById("submitNodeChange");
      submitChangeButton.onclick = function(){
         if(Utils.submitNodeChanges(valueChangeInputTag.value, weightChangeInputTag.value)){
            nodeChangeModal.style.display = "none";
            graphSVGHandler.updateCanvas();
         }
      };

      var submitNewNodeButton = document.getElementById("submitNewNode");
      submitNewNodeButton.onclick = function(){
         if(Utils.submitNewNode()){
            newNodeModal.style.display = "none";
            graphSVGHandler.generateNewNode();
         }
      };

      var deleteNodeButton = document.getElementById("deleteNode");
      deleteNodeButton.onclick = function(){
         var id = Utils.getChangingNodeID();
         nodeChangeModal.style.display = "none";
         graphSVGHandler.deleteNode(id);
      }

      var submitEdgeChangeButton = document.getElementById("submitEdgeChange");
      submitEdgeChangeButton.onclick = function(){
         edgeChangeModal.style.display = "none";
         graphSVGHandler.editEdge();
      }

      var deleteEdgeButton = document.getElementById("deleteEdge");
      deleteEdgeButton.onclick = function(){
         edgeChangeModal.style.display = "none";
         graphSVGHandler.deleteEdge();
      }
   };

   var initializeAlgorithmModals = function(){
      var modal = document.getElementById('algorithmModal');

      var modalX = document.getElementsByClassName("modalClose")[2];
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
            startInputTag.value = "";
            goalInputTag.value = "";
         }
      };
   };

   var linkAlgorithmButtons = function(){
      $('.algorithm').each(function(index, tag){
         tag.onclick = function(){
            graphSVGHandler.prepareAlgorithm(tag.innerHTML);
         }
      });
      //TODO: find a way to make this trigger a graph template rendering
   };


   //initialize buttons, togglers, and other things
   initializeForwardReverseButtons();
   intializeDirectedToggler();
   initializeNodeModals();
   initializeAlgorithmModals();
   linkAlgorithmButtons();
};

module.exports = GraphController;
