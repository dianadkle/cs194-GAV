"use strict";
/*
 *  Defined the Mongoose Schema and return a Model for a User
 */
 /*jslint node: true */

var mongoose = require('mongoose');
//require('mongoose-function')(mongoose);

var NodeDB = require('./nodeSchema');

// create a schema
var userSchema = new mongoose.Schema({
    first_name: String, // First name of the user.
    last_name: String,  // Last name of the user.
    description: String,  // A brief user description
    username: {type:String},    // username of the user
    password: String,   // Password Digest of the user
    // salt: String,   // Salt associated with password
    // graphs: [[{type: mongoose.Schema.Types.ObjectId, ref: 'NodeDB'}]]
    graphs: [[NodeDB.schema]]
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;