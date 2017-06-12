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
    achievements: [{
    	one_graph: Boolean,
    	five_graphs: Boolean,
    	ten_graphs: Boolean,
    	twenty_five_graphs: Boolean,
    	make_account: Boolean,
    	update_account: Boolean,
    	save_graph: Boolean,
    	load_graph: Boolean,
    	run_algorithm: Boolean,
    	run_nfadfa: Boolean,
    	one_quiz_correct: Boolean
    }],
    // graphs: [[{type: mongoose.Schema.Types.ObjectId, ref: 'NodeDB'}]]
    graphs: [[NodeDB.schema]]
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;