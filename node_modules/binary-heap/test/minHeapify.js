/*

test.js - heap.minHeapify() test

The MIT License (MIT)

Copyright (c) 2013 Tristan Slominski

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

*/

"use strict";

var Heap = require('../index.js');

var test = module.exports = {};

test['minHeapify(2) of [1,8,3,4,7,9,10,14,2,16] should result ' +
     'in [1,2,3,4,7,9,10,14,8,16]'] = function (test) {
    test.expect(1);
    var heap = new Heap({heap: [1,8,3,2,7,9,10,14,4,16], kind: 'min-heap'});
    test.deepEqual(heap.minHeapify(2).dump(), [1,2,3,4,7,9,10,14,8,16]);
    test.done();
};

test['minHeapify() on min heapified heap [1,2,3,4,7,9,10,14,8,16] ' +
     'makes no changes'] = function (test) {
    test.expect(1);
    var heap = new Heap({heap: [1,2,3,4,7,9,10,14,8,16], kind: 'min-heap'});
    test.deepEqual(heap.minHeapify(2).minHeapify(1).dump(), [1,2,3,4,7,9,10,14,8,16]);
    test.done();
};