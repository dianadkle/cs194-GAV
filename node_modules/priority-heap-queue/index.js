/*

index.js - priority queue

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

var Heap = require('binary-heap');

var PriorityQueue = module.exports = function PriorityQueue (options) {
    var self = this;

    options = options || {};

    self.array = [0];
    self.kind = options.kind || 'max'; // one of: min, max
};

// array: *required* 1-indexed array storing the heap structure
// index: *required* index of the key to decrease
// value: *required* the value to decrease the key to
PriorityQueue.heapDecreaseKey = function heapDecreaseKey (array, index, value) {
    if (value > array[index].key) {
        throw new Error('new key value is larger than current key');
    }
    array[index].key = value;
    while (index > 1 && array[Heap.parent(index)].key > array[index].key) {
        var parentIndex = Heap.parent(index);
        var temp = array[parentIndex];
        array[parentIndex] = array[index];
        array[index] = temp;
        index = parentIndex;
    }
};

// array: *required* 1-indexed array storing the heap structure
// index: *required* index of the key to increase
// value: *required* the value to increase the key to
PriorityQueue.heapIncreaseKey = function heapIncreaseKey (array, index, value) {
    if (value < array[index].key) {
        throw new Error('new key value is smaller than current key');
    }
    array[index].key = value;
    while (index > 1 && array[Heap.parent(index)].key < array[index].key) {
        var parentIndex = Heap.parent(index);
        var temp = array[parentIndex];
        array[parentIndex] = array[index];
        array[index] = temp;
        index = parentIndex;
    }
};

// array: *required* the 1-indexed array storage for the heap 
//        (array[0] will not be modified)
// index: *required* the array index to start maxHeapify procedure on
// heapSize: *required* heap size
PriorityQueue.maxHeapify = function maxHeapify (array, index, heapSize) {
    var left = Heap.left(index); // TODO: inline
    var right = Heap.right(index); // TODO: inline
    var largest;
    if (left <= heapSize && array[left].key > array[index].key) {
        largest = left;
    } else {
        largest = index;
    }
    if (right <= heapSize && array[right].key > array[largest].key) {
        largest = right;
    }
    if (largest != index) {
        var temp = array[index];
        array[index] = array[largest];
        array[largest] = temp;
        PriorityQueue.maxHeapify(array, largest, heapSize);
    }
};

// array: *required* the 1-indexed array storage for the heap 
//        (array[0] will not be modified)
// index: *required* the array index to start minHeapify procedure on
// heapSize: *required* heap size
PriorityQueue.minHeapify = function minHeapify (array, index, heapSize) {
    var left = Heap.left(index); // TODO: inline
    var right = Heap.right(index); // TODO: inline
    var smallest;
    if (left <= heapSize && array[left].key < array[index].key) {
        smallest = left;
    } else {
        smallest = index;
    }
    if (right <= heapSize && array[right].key < array[smallest].key) {
        smallest = right;
    }
    if (smallest != index) {
        var temp = array[index];
        array[index] = array[smallest];
        array[smallest] = temp;
        PriorityQueue.minHeapify(array, smallest, heapSize);
    }
};

// index: *required* the index of the element to change key value of
// value: *required* the value to set the key to
PriorityQueue.prototype.decreaseKey = function decreaseKey (index, value) {
    var self = this;
    if (self.kind == 'max') {
        throw new Error('decreaseKey() is not defined for max-priority queue');
    }
    PriorityQueue.heapDecreaseKey(self.array, index, value);
    return self;
};

PriorityQueue.prototype.extractMax = function extractMax () {
    var self = this;
    if (self.kind == 'min') {
        throw new Error('extractMax() is not defined for min-priority queue');
    }
    if (self.array[0] < 1) return undefined;
    var max = self.array[1];
    self.array[1] = self.array[self.array[0]]; // self.array[heapSize]
    self.array[0]--; // heapSize--
    // Heap.maxHeapify only works on arrays of numbers, so we implement our own
    PriorityQueue.maxHeapify(self.array, 1, self.array[0]);
    return max.data;
};

PriorityQueue.prototype.extractMin = function extractMin () {
    var self = this;
    if (self.kind == 'max') {
        throw new Error('extractMin() is not defined for max-priority queue');
    }
    if (self.array[0] < 1) return undefined;
    var min = self.array[1];
    self.array[1] = self.array[self.array[0]]; // self.array[heapSize]
    self.array[0]--; // heapSize--
    // Heap.minHeapify only works on arrays of numbers, so we implement our own
    PriorityQueue.minHeapify(self.array, 1, self.array[0]);
    return min.data;
};

// index: *required* the index of the element to change key value of
// value: *required* the value to set the key to
PriorityQueue.prototype.increaseKey = function increaseKey (index, value) {
    var self = this;
    if (self.kind == 'min') {
        throw new Error('increaseKey() is not defined for min-priority queue');
    }
    PriorityQueue.heapIncreaseKey(self.array, index, value);
    return self;
};

// key: *required* numeric key to associated with the element
// element: *required* data corresponding to the numeric key
PriorityQueue.prototype.insert = function insert (key, element) {
    var self = this;
    self.array[0]++; // heapSize++
    var arrayNode = {
        key: self.kind == 'max' ? -Infinity : Infinity,
        data: element
    };
    if (self.array[0] > self.array.length) {
        self.array.push(arrayNode);
    } else {
        self.array[self.array[0]] = arrayNode;
    }
    if (self.kind == 'max') {
        PriorityQueue.heapIncreaseKey(self.array, self.array[0], key);
    } else {
        PriorityQueue.heapDecreaseKey(self.array, self.array[0], key);
    }
    return self;
};

PriorityQueue.prototype.maximum = function maximum () {
    var self = this;
    if (self.kind == 'min') {
        throw new Error('maximum() is not defined for min-priority queue');
    }
    if (self.array[0] < 1) return undefined;
    return self.array[1].data;
};

PriorityQueue.prototype.minimum = function minimum () {
    var self = this;
    if (self.kind == 'max') {
        throw new Error('minimum() is not defined for max-priority queue');
    }
    if (self.array[0] < 1) return undefined;
    return self.array[1].data;
};