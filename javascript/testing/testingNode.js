'use strict';

var testResults = (function() {
    return {
        message1: 'SUCCESS',
        message2: 'SUCCESS',
        message3: 'SUCCESS'
    };
})();


var node = new Node(5, 3, 1, 10, "green");
if(node.getColor() !== 'green'){
   testResults.message1 = 'Failure in getColor; ';
}

if(node.getWeight() !== 10){
   if(testResults.message1 === 'SUCCESS'){
      testResults.message1 = '';
   }
   testResults.message1 += 'Failure in getWeight; ';
}

if(node.getX() !== 5){
   if(testResults.message1 === 'SUCCESS'){
      testResults.message1 = '';
   }
   testResults.message1 += 'Failure in getX; ';
}

if(node.getY() !== 3){
   if(testResults.message1 === 'SUCCESS'){
      testResults.message1 = '';
   }
   testResults.message1 += 'Failure in getY; ';
}

if(node.getValue() !== 1){
   if(testResults.message1 === 'SUCCESS'){
      testResults.message1 = '';
   }
   testResults.message1 += 'Failure in getValue; ';
}

if(testResults.message1 !== 'SUCCESS'){
   testResults.message2 = 'Aborting set tests';
} else {
   node.setColor('orange');
   node.setWeight(64);
   node.setX(48);
   node.setY(12);
   node.setValue('testValue');

   if(node.getWeight() !== 64){
      if(testResults.message2 === 'SUCCESS'){
         testResults.message2 = '';
      }
      testResults.message2 += 'Failure in setWeight; ';
   }

   if(node.getX() !== 48){
      if(testResults.message2 === 'SUCCESS'){
         testResults.message2 = '';
      }
      testResults.message2 += 'Failure in setX; ';
   }

   if(node.getY() !== 12){
      if(testResults.message2 === 'SUCCESS'){
         testResults.message2 = '';
      }
      testResults.message2 += 'Failure in setY; ';
   }

   if(node.getColor() !== 'orange'){
      if(testResults.message2 === 'SUCCESS'){
         testResults.message2 = '';
      }
      testResults.message2 += 'Failure in setColor; ';
   }

   if(node.getValue() !== 'testValue'){
      if(testResults.message2 === 'SUCCESS'){
         testResults.message2 = '';
      }
      testResults.message2 += 'Failure in setValue; ';
   }
}

if(testResults.message1 !== 'SUCCESS' || testResults.message2 !== 'SUCCESS'){
   testResults.message3 = 'Aborting algorithmic tests';
} else {
   node.setIntermediateValue('iv');
   if(node.getIntermediateValue() !== 'iv'){
      if(testResults.message3 === 'SUCCESS'){
         testResults.message3 = '';
      }
      testResults.message3 += 'Failure in getIntermediateValue or setIntermediateValue; ';
   }

   node.clearIntermediateValue();
   if(node.getIntermediateValue() !== null){
      if(testResults.message3 === 'SUCCESS'){
         testResults.message3 = '';
      }
      testResults.message3 += 'Failure in getIntermediateValue or clearIntermediateValue; ';
   }

   node.visit();
   if(!node.checkVisit()){
      if(testResults.message3 === 'SUCCESS'){
         testResults.message3 = '';
      }
      testResults.message3 += 'Failure in visit or checkVisit; ';
   }

   node.unvisit();
   if(node.checkVisit()){
      if(testResults.message3 === 'SUCCESS'){
         testResults.message3 = '';
      }
      testResults.message3 += 'Failure in unvisit or checkVisit; ';
   }

   node.visit();
   node.setIntermediateValue(4);
   node.setWeight(5);
   node.algorithmReset();

   if(node.checkVisit() || node.getIntermediateValue() !== null || node.getWeight() !== 0){
      if(testResults.message3 === 'SUCCESS'){
         testResults.message3 = '';
      }
      testResults.message3 += 'Failure in algorithmReset; ';
   }
}

console.log('testingNode.js: Test Node setters - ', testResults.message1);
console.log('testingNode.js: Test Node.getters - ', testResults.message2);
console.log('testingNode.js: Test Node algorithmic functions - ', testResults.message3);

// Store the result back into the global space called GAVNodeResults
window.GAVNodeResults = {
    message1: testResults.message1,
    message2: testResults.message2,
    message3: testResults.message3
};
