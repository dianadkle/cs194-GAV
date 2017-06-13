'use strict';
var DOMParser = require('xmldom').DOMParser;
var domParser = new DOMParser();
var Utils = require('../Utils');
var AutomataVisualizer = require('../AutomataVisualizer');

function AutomataController(userInfo){
   this.userInfo = userInfo;
};

AutomataController.prototype.control = function(){
   var automataVisualizer;
   var initializeAutomataSVG = function(automata_type){
      var aut_id = (automata_type === "NFA") ? "NfaSVG" : "DfaSVG";
      var cell = document.getElementById(aut_id);
      var svgXML;
      if(automata_type === "NFA"){
         svgXML= automataVisualizer.generateNFA();
      } else {
         svgXML= automataVisualizer.generateDFA();
      }
      var doc = domParser.parseFromString(svgXML);
      var svg = doc.getElementsByTagName('svg')[0];

      cell.setAttribute("width", svg.getAttribute("width"));
      cell.setAttribute("height", svg.getAttribute("height"));
      cell.innerHTML = svg.getElementsByTagName("g")[0].toString();
      
   };

   function inputNewRegex(regex){
      automataVisualizer = new AutomataVisualizer(regex);
      initializeAutomataSVG("DFA");
      initializeAutomataSVG("NFA");
   }

   inputNewRegex("a*b");
   var user_name = this.userInfo.username;

   document.getElementById('inputRegex').onclick = function(){
      var regex = document.getElementById('regexInput').value;
      var new_achievements;
      $.get("http://127.0.0.1:3000", function (data) {
         for (var i = 0; i < data.length; i++){
            if (data[i].username.localeCompare(user_name) === 0){
               var user = data[i];
               break;
            }
         }
         new_achievements = user.achievements;
         console.log("new achievement: " + new_achievements.run_nfadfa);
         new_achievements.run_nfadfa = true;

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
      try {
          inputNewRegex(regex);
      } catch(e) {
          alert("Invalid regular expression");
      }
   };
};

module.exports = AutomataController;
