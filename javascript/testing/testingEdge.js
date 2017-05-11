'use strict';

var testResults = (function() {
    return {
        message1: 'SUCCESS',
        message2: 'SUCCESS',
        message3: 'SUCCESS',
        message4: 'SUCCESS',
        message5: 'SUCCESS',
    };
})();

            //Node(x, y, value, weight, color)
var a = new Node(5, 3, 'value_1', 10, "green");
var b = new Node(4, 2, 'value_2', 20, "red");

var edge_undirected = new Edge(a, b, false);
var edge_directed = new Edge(a, b, true);

if (edge_undirected.checkDirected()){
   testResults.message1 = 'Undirected Edge Failure; direction given';
}

if (!edge_directed.checkDirected()){
   testResults.message2 = 'Directed Edge Failure; No direction given';
}

if(testResults.message2 !== 'SUCCESS'){
   testResults.message3 = 'Aborting further direction checks';
   testResults.message4 = 'Aborting direction switching';
} else {
   if(edge_directed.getStartNode() != a ||
      edge_directed.getEndNode() != b)
   {
      testResults.message3 = 'directed node\'s direction is incorrect';
   } else {
      edge_directed.switchDirection();

      if(edge_directed.getStartNode() != a ||
         edge_directed.getEndNode() != b)
      {
         testResults.message4 = 'switchDirection failure; direction unchanged';
      }
   }
}


var nodesFromUndirected = edge_undirected.getNodes();
var nodesFromDirected = edge_directed.getNodes();

if((nodesFromDirected.indexOf(a) === -1 || nodesFromDirected.indexOf(b) === -1)
|| (nodesFromUndirected.indexOf(a) === -1 || nodesFromUndirected.indexOf(b) === -1))
{
   testResults.message5 = ''
}


console.log('testingEdge.js: Test Undirected edge construction - ', testResults.message1);
console.log('testingEdge.js: Test Directed edge construction - ', testResults.message2);
console.log('testingEdge.js: Test Directed edge\'s direction - ', testResults.message3);
console.log('testingEdge.js: Test Directed edge\'s direction switch - ', testResults.message4);
console.log('testingEdge.js: Test edges\' nodes - ', testResults.message5);

// Store the result back into the global space called GAVEdgeResults
window.GAVEdgeResults = {
    message1: testResults.message1,
    message2: testResults.message2,
    message3: testResults.message3,
    message4: testResults.message4,
    message5: testResults.message5
};
