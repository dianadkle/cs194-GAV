# priority-heap-queue

_Stability: 1 - [Experimental](https://github.com/tristanls/stability-index#stability-1---experimental)_

Priority queue.

## Installation

    npm install priority-heap-queue

## Tests

    npm test

## Usage

```javascript
var PriorityQueue = require('priority-heap-queue');

var maxQueue = new PriorityQueue();
var minQueue = new PriorityQueue({kind: 'min'});
```

## Overview

_TODO_

## Documentation

### PriorityQueue

A JavaScript implementation of a priority queue using heap data structure.

*WARNING*: This implementation uses 1-indexed arrays (instead of 0-indexed) arrays. 

#### PriorityQueue.heapDecreaseKey(array, index, value)

  * `array`: _Array_ 1-indexed array storing the heap structure
  * `index`: _Integer_ index of the key to decrease
  * `value`: _Integer_ the value to decrease the key to

Sets the value of the key at `index` to `value` and ensures heap property is maintained as a result.

#### PriorityQueue.heapIncreaseKey(array, index, value)

  * `array`: _Array_ 1-indexed array storing the heap structure
  * `index`: _Integer_ index of the key to increase
  * `value`: _Integer_ the value to increase the key to

Sets the value of the key at `index` to `value` and ensures heap property is maintained as a result.

#### PriorityQueue.maxHeapify(array, index, heapSize)

  * `array`: _Array_ 1-indexed array storing the heap structure
  * `index`: _Integer_ the array index to start maxHeapify procedure on
  * `heapSize`: _Integer_ heap size

Ensures that the max-heap property is satisfied for the sub-tree rooted at `index` of the array representing a binary tree.

#### PriorityQueeu.minHeapify(array, index, heapSize)

  * `array`: _Array_ 1-indexed array storing the heap structure
  * `index`: _Integer_ the array index to start maxHeapify procedure on
  * `heapSize`: _Integer_ heap size

Ensures that the min-heap property is satisfied for the sub-tree rooted at `index` of the array representing a binary tree.

#### new PriorityQueue(options)

  * `options`:
    * `kind`: _String_ One of `min`, `max` (default: `max`)

Creates a new PriorityQueue.

#### priorityQueue.decreaseKey(index, value)

  * `index`: _Integer_ index of the key to decrease
  * `value`: _Integer_ the value to decrease the key to

Sets the value of the key at `index` to `value` and ensures heap property is maintained as a result.

#### priorityQueue.extractMax()

Removes and returns the element with the largest key.

#### priorityQueue.extractMin()

Removes and returns the element with the smallest key.

#### priorityQueue.increaseKey(index, value)

  * `index`: _Integer_ index of the key to increase
  * `value`: _Integer_ the value to increase the key to

Sets the value of the key at `index` to `value` and ensures heap property is maintained as a result.

#### priorityQueue.insert(key, element)

  * `key`: _Integer_ key of the element to be inserted
  * `element`: _Any_ element to associate with the key

Inserts the `element` into the priority queue at the specified `key`.

#### priorityQueue.maximum()

Returns the element with the largest key. The element is _not_ removed.

#### priorityQueue.minimum()

Returns the element with the smallest key. The element is _not_ removed.