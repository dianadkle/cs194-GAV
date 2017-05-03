'use strict';

var testResults = (function() {
    return {
        testingMainMessage1: 'SUCCESS',
        testingMainMessage2: 'SUCCESS'
        /* TODO: initialize as many messages as you want to use for testing
         * various aspects/components of the javscript file you're analyzing */
    };
})();

/* TODO: add testing, modify messages for failure cases */
// failure example:  testResults.testingMainMessage2 = 'FAILURE';

/* TODO: Test/write about different parts of the js file you're testing */
console.log('Test GAV Main component 1:', testResults.testingMainMessage1);
console.log('Test GAV Main component 1:', testResults.testingMainMessage2);

// Store the result back into the global space called GAVMainResults
window.GAVMainResults = {
    testingMainMessage1: testResults.testingMainMessage1,
    testingMainMessage2: testResults.testingMainMessage2
};
