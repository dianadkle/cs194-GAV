'use strict';

var DOMParser = require('xmldom').DOMParser;
var domParser = new DOMParser();
var Utils = require('../Utils');

function AutomataController(userInfo){
   this.userInfo = userInfo;
};

AutomataController.prototype.control = function(){
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
   initializeAutomataSVG("DFA");
   initializeAutomataSVG("NFA");
};
