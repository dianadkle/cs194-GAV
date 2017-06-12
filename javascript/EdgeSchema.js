"use strict";
/*
 *  Defined the Mongoose Schema and return a Model for an Edge
 */
 /*jslint node: true */

var mongoose = require('mongoose');

// create a schema
var edgeSchema = new mongoose.Schema({
    start: Number, 
    end: Number,  
    weight: Number, 
    color: String,
});

// the schema is useless so far
// we need to create a model using it
var EdgeDB = mongoose.model('EdgeDB', edgeSchema);

// make this available to our users in our Node applications
module.exports = EdgeDB;