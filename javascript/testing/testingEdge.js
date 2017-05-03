'use strict';

var testResults = (function() {
    return {
        testingEdgeMessage1: 'SUCCESS',
        testingEdgeMessage2: 'SUCCESS'
        /* TODO: initialize as many messages as you want to use for testing
         * various aspects/components of the javscript file you're analyzing */
    };
})();

/* TODO: add testing, modify messages for failure cases */
// failure example:  testResults.testingEdgeMessage2 = 'FAILURE';

/* TODO: Test/write about different parts of the js file you're testing */
console.log('Test GAV Edge component 1:', testResults.testingEdgeMessage1);
console.log('Test GAV Edge component 2:', testResults.testingEdgeMessage2);

// Store the result back into the global space called GAVEdgeResults
window.GAVEdgeResults = {
    testingEdgeMessage1: testResults.testingEdgeMessage1,
    testingEdgeMessage2: testResults.testingEdgeMessage2
};
