'use strict';

var testResults = (function() {
    return {
        testingVertexMessage1: 'SUCCESS',
        testingVertexMessage2: 'SUCCESS'
        /* TODO: initialize as many messages as you want to use for testing
         * various aspects/components of the javscript file you're analyzing */
    };
})();

/* TODO: add testing, modify messages for failure cases */
// failure example:  testResults.testingVertexMessage2 = 'FAILURE';

/* TODO: Test/write about different parts of the js file you're testing */
console.log('Test GAV Vertex component 1:', testResults.testingVertexMessage1);
console.log('Test GAV Vertex component 2:', testResults.testingVertexMessage2);

// Store the result back into the global space called GAVVertexResults
window.GAVVertexResults = {
    testingVertexMessage1: testResults.testingVertexMessage1,
    testingVertexMessage2: testResults.testingVertexMessage2
};
