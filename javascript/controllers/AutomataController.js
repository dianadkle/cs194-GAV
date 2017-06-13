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

   document.getElementById('inputRegex').onclick = function(){
      var regex = document.getElementById('regexInput').value;
      try {
          inputNewRegex(regex);
      } catch(e) {
          alert("Invalid regular expression");
      }
   };
};

module.exports = AutomataController;
