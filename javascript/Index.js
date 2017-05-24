'use strict';

var CanvasSVGHandler = require('./CanvasSVGHandler');

/***********************************Index.js***********************************/


var nodes = [
   {x:20, y:300, id: 0, value: "Arlene", weight: 2, color: "yellow"},
   {x:600, y:200, id: 1, value: "Brett", weight: 5, color: "yellow"},
   {x:400, y:100, id: 2, value: "Cindy", weight: 3, color: "yellow"},
   {x:200, y:500, id: 3, value: "Dennis", weight: 6, color: "yellow"},
   {x:300, y:400, id: 4, value: "Emily", weight: 4, color: "yellow"},
   {x:450, y:250, id: 5, value: "Frank", weight: 1, color: "yellow"},
   {x:40, y:350, id: 6, value: "Gilbert", weight: 7, color: "yellow"},
   {x:220, y:450, id: 7, value: "Harvey", weight: 9, color: "yellow"},
   {x:140, y:550, id: 8, value: "Irene", weight: 8, color: "yellow"},
   {x:700, y:50, id: 9, value: "Jose", weight: 11, color: "yellow"},
   {x:600, y:150, id: 10, value: "Katrina", weight: 12, color: "yellow"},
   {x:360, y:200, id: 11, value: "Lee", weight: 10, color: "yellow"},
   {x:100, y:320, id: 12, value: "Maria", weight: 13, color: "yellow"}
];

var links = [
   {source: 2, target: 9},
   {source: 0, target: 7},
   {source: 1, target: 7},
   {source: 1, target: 5},
   {source: 7, target: 6},
   {source: 4, target: 2},
   {source: 6, target: 3},
   {source: 5, target: 4},
   {source: 2, target: 9},
   {source: 8, target: 7},
   {source: 5, target: 3},
   {source: 5, target: 1},
   {source: 9, target: 3},
   {source: 0, target: 2}
];

var algorithms = [
   "Depth-First Search",
   "Breadth-First Search",
   "Dijkstra's Algorithm"
];

var radius = 20;

window.onload = function(){
   var canvasSVGHandler = new CanvasSVGHandler(algorithms);
}
