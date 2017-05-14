/*

index.js - binary heap

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

// options:
//   heap: an array to treat directly as heap; no transformations will be made
//         on this array to satisfy the heap property; to build a heap from an
//         array use Heap.build({heap: array}); (default: [])
//   kind: one of: min-heap, max-heap (default: max-heap)
// *WARNING*: this Heap implementation uses 1-indexed arrays 
//            (instead of 0-indexed), array[0] is used to store heap size
var Heap = module.exports = function Heap (options) {
    var self = this;

    options = options || {};
    options.heap = options.heap || [];

    self.array = [options.heap.length].concat(options.heap);
    self.kind = options.kind || 'max-heap'; // one of: min-heap, max-heap
};

// options: see documentation of Heap()
Heap.build = function build (options) {
    return new Heap(options).build();
};

// array: *required* the 1-indexed array storage for the heap 
//        (array[0] will not be modified)
// heapSize: *required* heap size
Heap.buildMaxHeap = function buildMaxHeap (array, heapSize) {
    var middle = Math.floor(heapSize / 2);
    for (var i = middle; i > 0; i--) {
        Heap.maxHeapify(array, i, heapSize);
    }
    return array;
};

// array: *required* the 1-indexed array storage for the heap 
//        (array[0] will not be modified)
// heapSize: *required* heap size
Heap.buildMinHeap = function buildMinHeap (array, heapSize) {
    var middle = Math.floor(heapSize / 2);
    for (var i = middle; i > 0; i--) {
        Heap.minHeapify(array, i, heapSize);
    }
    return array;
};

// index: *required* the index of a node to find the left child of
// *WARNING*: this method is not safe for index < 1;
Heap.left = function left (index) {
    return index << 1;
};

// array: *required* the 1-indexed array storage for the heap 
//        (array[0] will not be modified)
// index: *required* the array index to start maxHeapify procedure on
// heapSize: *required* heap size
Heap.maxHeapify = function maxHeapify (array, index, heapSize) {
    var left = Heap.left(index); // TODO: inline
    var right = Heap.right(index); // TODO: inline
    var largest;
    if (left <= heapSize && array[left] > array[index]) {
        largest = left;
    } else {
        largest = index;
    }
    if (right <= heapSize && array[right] > array[largest]) {
        largest = right;
    }
    if (largest != index) {
        var temp = array[index];
        array[index] = array[largest];
        array[largest] = temp;
        Heap.maxHeapify(array, largest, heapSize);
    }
};

// array: *required* the 1-indexed array storage for the heap 
//        (array[0] will not be modified)
// index: *required* the array index to start minHeapify procedure on
// heapSize: *required* heap size
Heap.minHeapify = function minHeapify (array, index, heapSize) {
    var left = Heap.left(index); // TODO: inline
    var right = Heap.right(index); // TODO: inline
    var smallest;
    if (left <= heapSize && array[left] < array[index]) {
        smallest = left;
    } else {
        smallest = index;
    }
    if (right <= heapSize && array[right] < array[smallest]) {
        smallest = right;
    }
    if (smallest != index) {
        var temp = array[index];
        array[index] = array[smallest];
        array[smallest] = temp;
        Heap.minHeapify(array, smallest, heapSize);
    }
}

// index: *required* the index of a node to find the parent of
// *WARNING*: this method is not safe for index < 1;
Heap.parent = function parent (index) {
    return index >> 1;
};

// index: *required* the index of a node to find the right child of
// *WARNING*: this method is not safe for index < 1;
Heap.right = function right (index) {
    return (index << 1) + 1;
};

Heap.prototype.build = function build () {
    var self = this;
    if (self.kind == 'max-heap') {
        Heap.buildMaxHeap(self.array, self.array[0]);
    } else {
        Heap.buildMinHeap(self.array, self.array[0]);
    }
    return self;
};

Heap.prototype.dump = function dump () {
    var self = this;
    return self.array.slice(1);
};

// index: *required* the array index to start maxHeapify procedure on
Heap.prototype.maxHeapify = function (index) {
    var self = this;
    Heap.maxHeapify(self.array, index, self.array[0]);
    return self;
};

// index: *required* the array index to start minHeapify procedure on
Heap.prototype.minHeapify = function (index) {
    var self = this;
    Heap.minHeapify(self.array, index, self.array[0]);
    return self;
};

Heap.prototype.size = function size () {
    var self = this;
    return self.array[0];
};