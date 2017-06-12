"use strict";
/*
 *  Defined the Mongoose Schema and return a Model for a Node
 */
/*jslint node: true */

var mongoose = require('mongoose');
var EdgeDB = require('./edgeSchema');

// create a schema
var nodeSchema = new mongoose.Schema({
    value: Number, 
    id: Number,  
    weight: Number, 
    color: String,    
    intermediateValue: Number,
    visited: Boolean,
    in_neighbors: [Number],
    out_neighbors: [Number],
    in_edges: [[ Number, EdgeDB ]],
    out_edges: [[ Number, EdgeDB ]],
    // parent: Number
});

// the schema is useless so far
// we need to create a model using it
var NodeDB = mongoose.model('NodeDB', nodeSchema);

// make this available to our users in our Node applications
module.exports = NodeDB;