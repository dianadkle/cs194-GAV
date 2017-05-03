'use strict';

/* To run the test: node run-tests-using-node.js */

// We need the Node.js file system access module (fs) and the Node.js JavaScript VM access
var fs = require('fs');
var vm = require('vm');

// Build an emulation of the browser's script tag processing where everything is in a global
// space and goes under the name window.
global.window = global;  // The browser script assume global is available under the name window

/**
 * processScriptFromFile - Emulate the effects of a script tag in the browser by running the
 * contents of the file as a script with its scope being the global object.
 * @param {string} filename - File name of script to load and run.
 */
function processScriptFromFile(filename) {
    // Warning: Ugly, un-Node.js-like code warning:
    // In order to emulate the browser JavaScript environment we need to undo the default isolation
    // in node modules. By directly calling into the Node.js vm.Script() API we can have
    // all the JavaScripts files run in the same context like on the browser.
    try {
        new vm.Script(fs.readFileSync(filename).toString(), {filename: filename}).runInThisContext();
    } catch (err) {
        // fs.readFileSync communicates errors using exceptions. We log but otherwise ignore errors
        console.error('Error processing', filename, ':', err.message);
    }
}

console.log('*********** Running GAV tests ***********');

console.log('*** Loading project files ....');
/* TODO: add javascript files if you create them*/
processScriptFromFile('../Index.js');
processScriptFromFile('../Utils.js');
processScriptFromFile('../Edge.js');
processScriptFromFile('../Vertex.js');
processScriptFromFile('../AlgorithmExecutor.js');
processScriptFromFile('../CanvasModifier.js');
console.log('*** Running tests ....');


/* TODO: add testing files for your new Javascript files */
processScriptFromFile('./testingIndex.js');
processScriptFromFile('./testingUtils.js');
processScriptFromFile('./testingVertex.js');
processScriptFromFile('./testingEdge.js');
processScriptFromFile('./testingAlgorithmExecutor.js');
processScriptFromFile('./testingCanvasModifier.js');


/* TODO: add more results as you test them */
var testMessages = [];
testMessages.push(global.GAVIndexResults.message1);
testMessages.push(global.GAVIndexResults.message2);
testMessages.push(global.GAVUtilsResults.message1);
testMessages.push(global.GAVUtilsResults.message2);
testMessages.push(global.GAVEdgeResults.message1);
testMessages.push(global.GAVEdgeResults.message2);
testMessages.push(global.GAVVertexResults.message1);
testMessages.push(global.GAVVertexResults.message2);
testMessages.push(global.GAVAlgorithmExecutorResults.message1);
testMessages.push(global.GAVAlgorithmExecutorResults.message2);
testMessages.push(global.GAVCanvasModifierResults.message1);
testMessages.push(global.GAVCanvasModifierResults.message2);

var testWorked = true;

testMessages.forEach(function(message){
   if (message !== 'SUCCESS'){
      testWorked = false;
      //tip: make sure to make FAILURE messages descriptive
      console.log(message);
   }
});


console.log('*********** Running GAV tests ***********:',
    testWorked ? 'Success' : 'Fail');

process.exit(Number(!testWorked));  // For npm: Return process status code 0 on success, 1 on failure.
