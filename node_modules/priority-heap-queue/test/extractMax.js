/*

test.js - maxQueue.extractMax() test

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

var PriorityQueue = require('../index.js');

var test = module.exports = {};

test['extractMax() should remove the element with maximum key value'] = function (test) {
    test.expect(3);
    var maxQueue = new PriorityQueue();
    maxQueue.insert(3, 'bar');
    maxQueue.insert(5, 'foo');
    maxQueue.insert(4, 'baz');
    maxQueue.insert(7, 'goo');
    test.equal(maxQueue.maximum(), 'goo');
    test.equal(maxQueue.extractMax(), 'goo');
    test.equal(maxQueue.maximum(), 'foo');
    test.done();
};

test['extractMax() should return undefined if no elements'] = function (test) {
    test.expect(1);
    var maxQueue = new PriorityQueue();
    test.ok(maxQueue.extractMax() === undefined);
    test.done();
};

test['calling extractMax() on min queue should result in an error'] = function (test) {
    test.expect(1);
    var minQueue = new PriorityQueue({kind: 'min'});
    test.throws(function () {
        minQueue.extractMax()
    });
    test.done();
};