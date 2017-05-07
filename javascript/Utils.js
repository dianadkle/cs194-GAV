'use strict';

function createTuple(name, age){
   return Object.freeze({name: name, age: age});
}

var foo = function(d){
   return d + "!";
};
