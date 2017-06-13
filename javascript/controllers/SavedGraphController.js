'use strict';

var Utils = require('../Utils');
var GraphSVGHandler = require('../GraphSVGHandler');
var AutomataVisualizer = require('../AutomataVisualizer');

function SavedGraphController(userInfo){
   this.userInfo = userInfo;
};

SavedGraphController.prototype.control = function(){
	var user;
	var u_name = this.userInfo.username;
	var graphs;
    $.get("http://127.0.0.1:3000", function (data) {
	    for (var i = 0; i < data.length; i++){
	        console.log("data:"+data[i].username);
	        console.log("profile:"+u_name);
	        if (data[i].username === u_name){
	            user = data[i];
	        } 
	    }
	    graphs = user.graphs;
	    for (var property in graphs) {
    		if (graphs.hasOwnProperty(property) && property !== "key") {
        		//display graph names
    		}
		}
    });
};

module.exports = SavedGraphController;
