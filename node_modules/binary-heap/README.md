# binary-heap

_Stability: 1 - [Experimental](https://github.com/tristanls/stability-index#stability-1---experimental)_

Binary heap.

## Installation

    npm install binary-heap

## Tests

    npm test

## Usage

```javascript
var Heap = require('binary-heap');

var heap1 = new Heap();
var heap2 = Heap.build({heap: [3,7,2,1]});
```

## Overview

## Documentation

### Heap

A JavaScript implementation of a binary heap.

*WARNING*: This heap implementation uses 1-indexed arrays (instead of 0-indexed) arrays. Therefore, the indexes used in `Heap.left(index)`, `Heap.right(index)` and others, are assuming that the binary tree representing the heap has a root node at index = 1.

#### Heap.build(options)

  * `options` _Object_ see `new Heap(options)` documentation

Creates a new Heap and if given `options.heap` will ensure that the returned heap satisfies the heap property dictated by `options.kind`.

#### Heap.buildMaxHeap(array, heapSize)

  * `array` _Array_ the 1-indexed array storage for the heap (array[0] will not be modified)
  * `heapSize` _Integer_ heap size

Changes the `array` in place so that it satisfies max heap property. Returns the resulting `array` for convenience.

#### Heap.buildMinHeap(array, heapSize)

  * `array` _Array_ the 1-indexed array storage for the heap (array[0] will not be modified)
  * `heapSize` _Integer_ heap size

Changes the `array` in place so that it satisfies min heap property. Returns the resulting `array` for convenience.

#### Heap.left(index)

  * `index` _Integer_ index of a node to find the left child of

Returns the index of the left child for the node at index `index`.

*WARNING*: this method is not safe, invalid input is not checked

#### Heap.maxHeapify(array, index, heapSize)

  * `array` _Array_ the 1-indexed array storage for the heap (array[0] will not be modified)
  * `index` _Integer_ the array index to start maxHeapify procedure on
  * `heapSize` _Integer_ heap size

Ensures that the max-heap property is satisfied for the sub-tree rooted at `index` of the array representing a binary tree.

#### Heap.minHeapify(array, index, heapSize)

  * `array` _Array_ the 1-indexed array storage for the heap (array[0] will not be modified)
  * `index` _Integer_ the array index to start minHeapify procedure on
  * `heapSize` _Integer_ heap size

Ensures that the min-heap property is satisfied for the sub-tree rooted at `index` of the array representing a binary tree.

#### Heap.parent(index)

  * `index` _Integer_ index of a node to find the parent of

Returns the index of the parent for the node at index `index`.

*WARNING*: this method is not safe, invalid input is not checked

#### Heap.right(index)

  * `index` _Integer_ index of a node to find the right child of

Returns the index of the right child of the node at index `index`.

*WARNING*: this method is not safe, invalid input is not checked

#### new Heap(options)

  * `options`:
    * `heap`: _Array_ An optional array that will be used as initial heap state and not modified to satisfy the heap property.
    * `kind`: _String_ One of `min-heap`, `max-heap` (default: `max-heap`)

Creates a new Heap.

#### heap.build()

Builds a max or min heap, depending on the heap kind. Returns the heap for convenience.

#### heap.dump()

Dumps the present contents of storage used for the heap. The dump may include elements beyond heap size.

#### heap.maxHeapify(index)

  * `index` _Integer_ index of the node where to begin the procedure

Ensures that the max-heap property is satisfied for the sub-tree rooted at `index`.

#### heap.minHeapify(index)

  * `index` _Integer_ index of the node where to begin the procedure

Ensures that the min-heap property is satisfied for the sub-tree rooted at `index`.

#### heap.size()

Returns heap size.