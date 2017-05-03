'use strict';

var testResults = (function() {
    return {
        message1: 'SUCCESS',
        message2: 'SUCCESS'
        /* TODO: initialize as many messages as you want to use for testing
         * various aspects/components of the javscript file you're analyzing */
    };
})();

/* TODO: add testing, modify messages for failure cases */
// failure example:  testResults.message2 = 'FAILURE';

/* TODO: Test/write about different parts of the js file you're testing */
console.log('Test GAV Index component 1:', testResults.message1);
console.log('Test GAV Index component 1:', testResults.message2);

// Store the result back into the global space called GAVIndexResults
window.GAVIndexResults = {
    message1: testResults.message1,
    message2: testResults.message2
};
