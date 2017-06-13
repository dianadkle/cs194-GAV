'use strict';

var Utils = require('../Utils');
var GraphSVGHandler = require('../GraphSVGHandler');
var AutomataVisualizer = require('../AutomataVisualizer');

function SavedGraphController(userInfo){
   this.userInfo = userInfo;
};

SavedGraphController.prototype.control = function(index){
	var user;
	var u_name = this.userInfo.username;
	var graphs;
    $.get("http://127.0.0.1:3000", function (data) {
	    for (var i = 0; i < data.length; i++){
	        if (data[i].username === u_name){
	            user = data[i];
	        }
	    }
	    graphs = user.graphs;
       var i = 1;
	    for (var property in graphs) {
    		if (graphs.hasOwnProperty(property) && property !== "key") {
            var id= "graph" + i;
            var imgID_hash = '#graphImage' + i;
            var imgID = 'graphImage' + i;
            $(imgID_hash).css("display", "inline");
            document.getElementById(id).innerHTML = property;
        		i++;
            document.getElementById(imgID).onclick = function(){
               index.renderGraph(graphs[property]);
            };
    		}
		}
    });
};

module.exports = SavedGraphController;
