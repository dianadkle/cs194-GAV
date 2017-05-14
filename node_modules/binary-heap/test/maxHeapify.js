/*

test.js - heap.maxHeapify() test

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

test['maxHeapify(2) of [16,4,10,14,7,9,3,2,8,1] should result ' +
     'in [16,14,10,8,7,9,3,2,4,1]'] = function (test) {
    test.expect(1);
    var heap = new Heap({heap: [16,4,10,14,7,9,3,2,8,1]});
    test.deepEqual(heap.maxHeapify(2).dump(), [16,14,10,8,7,9,3,2,4,1]);
    test.done();
};

test['maxHeapify() on max heapified heap [16,14,10,8,7,9,3,2,4,1] ' +
     'makes no changes'] = function (test) {
    test.expect(1);
    var heap = new Heap({heap: [16,14,10,8,7,9,3,2,4,1]});
    test.deepEqual(heap.maxHeapify(2).maxHeapify(1).dump(), [16,14,10,8,7,9,3,2,4,1]);
    test.done();
};