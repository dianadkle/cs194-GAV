'use strict';

var Utils = require('../Utils');
var GraphSVGHandler = require('../GraphSVGHandler');

function GraphController(userInfo){
   this.userInfo = userInfo;
};

GraphController.prototype.control = function(algorithmsParam){
   var algorithms = algorithmsParam;
   var graphSVGHandler = new GraphSVGHandler();

   var createAlgorithmButtons = function(){
      var algOpenTag = "<p class='algorithm'>";
      var algCloseTag = "</p>"
      algorithms.map(function(algorithm){
         var elem = algOpenTag + algorithm + algCloseTag;
         $('#algorithmsRow').append(elem);
      });
   };

   var initializeSaveButton = function(){
      var saveButton = document.getElementById("saveButton");
      saveButton.onclick = function(){
         var graph = graphSVGHandler.downloadGraph();
         var modal = document.getElementById('saveGraphModal');
         modal.style.display = "block";
      }
   };

   var initializeForwardReverseButtons = function(userInfo){
      var reverseButton = document.getElementById("reverseButton");
      var clearButton = document.getElementById("clearButton");
      var forwardButton = document.getElementById("forwardButton");

      reverseButton.onclick = function(){
         var previousComment = graphSVGHandler.runPreviousAlgorithmStep();
         if(previousComment === 'FAILURE'){
            alert("You haven't selected an algorithm to run");
         } else if (previousComment === 'END'){
            alert("You've reached the first step of the algorithm");
         } else {
            document.getElementById('comment').innerHTML = previousComment;
         }
      };

      clearButton.onclick = function(){
         graphSVGHandler.clearAlgorithm();
         document.getElementById('comment').innerHTML = '';
      };

      forwardButton.onclick = function(){
         var nextComment = graphSVGHandler.runNextAlgorithmStep();
         if(nextComment === 'FAILURE'){
            alert("You haven't selected an algorithm to run");
         } else if(nextComment === 'END'){
            alert("You've already reached the last step of the algorithm");
         } else {
            var new_achievements;
            var user_name = userInfo.username;
            $.get("http://127.0.0.1:3000", function (data) {
               for (var i = 0; i < data.length; i++){
                  if (data[i].username.localeCompare(user_name) === 0){
                     var user = data[i];
                     break;
                  }
               }
               new_achievements = user.achievements;
               new_achievements.run_algorithm = true;

               $.ajax({
                  url: "http://127.0.0.1:3000",
                  method: "PUT",
                  data: {
                     'firstname': user.firstname,
                     'lastname': user.lastname,
                     'email': user.email,
                     'password': user.password,
                     'achievements': new_achievements,
                     'num_graphs': user.num_graphs,
                     'graphs': user.graphs},
                  success: function(response) {
                     console.log(response.body);
                  }
               });
            });
            document.getElementById('comment').innerHTML = nextComment;
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

   var initializeNodeModals = function(userInfo){
      var nodeChangeModal = document.getElementById('nodeChangeModal');
      var newNodeModal = document.getElementById('newNodeModal');
      var edgeChangeModal = document.getElementById('edgeChangeModal');
      var saveGraphModal = document.getElementById('saveGraphModal');
      var nodeChangeModalX = document.getElementById('closeNodeChangeModal');
      var newNodeModalX = document.getElementById('closeNewNodeModal');
      var edgeChangeModalX = document.getElementById('closeEdgeChangeModal');
      var saveGraphModalX = document.getElementById('closeSaveGraphModal');

      nodeChangeModalX.onclick = function() {
         nodeChangeModal.style.display = "none";
      };
      newNodeModalX.onclick = function() {
         newNodeModal.style.display = "none";
      };
      edgeChangeModalX.onclick = function(){
         edgeChangeModal.style.display = "none";
      };
      saveGraphModalX.onclick = function(){
         saveGraphModal.style.display = "none";
      };

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
         if (event.target === modal) {
            nodeChangeModal.style.display = "none";
            newNodeModal.style.display = "none";
            edgeChangeModal.style.display = "none";
            saveGraphModal.style.display = "none";
         }
      };
      var valueChangeInputTag = document.getElementById("valueChangeInput");
      var weightChangeInputTag = document.getElementById("weightChangeInput");
      var graphNameInputTag = document.getElementById("graphNameInput");
      var submitChangeButton = document.getElementById("submitNodeChange");
      var saveGraphButton = document.getElementById("saveGraph");

      saveGraphButton.onclick = function(){
         var graphName = graphNameInputTag.value;
         if(graphName === null || graphName === "" || graphName === undefined){
            alert("please name your graph!");
         } else {
            var graph = graphSVGHandler.downloadGraph();
            //console.log(this.userInfo);
            var user_name = userInfo.username;
            var user;
            var graphs;
            var new_achievements;
            $.get("http://127.0.0.1:3000", function (data) {
               for (var i = 0; i < data.length; i++){
                  if (data[i].username.localeCompare(user_name) === 0){
                     var user = data[i];
                     graphs = data[i].graphs;
                     break;
                  }
               }
               new_achievements = user.achievements;
               new_achievements.save_graph = true;
               new_achievements.one_graph = true;

               graphs[graphName] = graph;

               var new_num_graphs = parseInt(user.num_graphs,10) + 1;

               if (new_num_graphs >= 5){
                  new_achievements.five_graphs = true;
               }
               if (new_num_graphs >= 10){
                  new_achievements.ten_graphs = true;
               }
               if (new_num_graphs >= 25){
                  new_achievements.twenty_five_graphs = true;
               }

               $.ajax({
                  url: "http://127.0.0.1:3000",
                  method: "PUT",
                  data: {
                     'firstname': user.firstname,
                     'lastname': user.lastname,
                     'email': user.email,
                     'password': user.password,
                     'achievements': new_achievements,
                     'num_graphs': new_num_graphs,
                     'graphs': graphs},
                  success: function(response) {
                     console.log(response.body);
                  }
               });
            });

            //use graphName
            //TODO: do HTTP request here
            saveGraphModal.style.display = "none";
         }
      };

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
      var modalX = document.getElementById('closeAlgorithmModal');
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
   createAlgorithmButtons();
   initializeForwardReverseButtons(this.userInfo);
   intializeDirectedToggler();
   initializeNodeModals(this.userInfo);
   initializeAlgorithmModals();
   linkAlgorithmButtons();
   initializeSaveButton();
};

module.exports = GraphController;
