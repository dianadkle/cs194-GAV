/*

test.js - minQueue.extractMin() test

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

test['extractMin() should remove the element with maximum key value'] = function (test) {
    test.expect(3);
    var minQueue = new PriorityQueue({kind: 'min'});
    minQueue.insert(3, 'bar');
    minQueue.insert(5, 'foo');
    minQueue.insert(4, 'baz');
    minQueue.insert(7, 'goo');
    test.equal(minQueue.minimum(), 'bar');
    test.equal(minQueue.extractMin(), 'bar');
    test.equal(minQueue.minimum(), 'baz');
    test.done();
};

test['extractMin() should return undefined if no elements'] = function (test) {
    test.expect(1);
    var minQueue = new PriorityQueue({kind: 'min'});
    test.ok(minQueue.extractMin() === undefined);
    test.done();
};

test['calling extractMin() on min queue should result in an error'] = function (test) {
    test.expect(1);
    var minQueue = new PriorityQueue();
    test.throws(function () {
        minQueue.extractMin()
    });
    test.done();
};