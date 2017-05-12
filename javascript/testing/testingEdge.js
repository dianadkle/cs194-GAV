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

var edge = new Edge(a, b);

if(edge.getStartNode() != a ||
   edge.getEndNode() != b)
{
   testResults.message1 = 'directed node\'s direction is incorrect';
   testResults.message2 = 'aborting switchDirection testing;'
} else {
   edge.switchDirection();

   if(edge.getStartNode() != b ||
      edge.getEndNode() != a)
   {
      testResults.message2 = 'switchDirection failure; direction unchanged';
   }
}


var nodes = edge.getNodes();

if(nodes.indexOf(a) === -1 || nodes.indexOf(b) === -1)
{
   testResults.message3 = 'edge holds incorrect or non-nodes'
}


console.log('testingEdge.js: Test edge direction - ', testResults.message1);
console.log('testingEdge.js: Test directed switching - ', testResults.message2);
console.log('testingEdge.js: Test edges\' nodes - ', testResults.message3);

// Store the result back into the global space called GAVEdgeResults
window.GAVEdgeResults = {
    message1: testResults.message1,
    message2: testResults.message2,
    message3: testResults.message3
};
