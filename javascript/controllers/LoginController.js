'use strict';
var Utils = require('../Utils');
//var mongoose = require('mongoose');
//var Database = require('../mongo_db.js');

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/userDB');
// // mongoose.connect('mongodb://127.0.0.1/userDB');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {
//   console.log("Connected");
// });

function LoginController(index){
   this.index = index;//http
};

LoginController.prototype.control = function(){
   var index = this.index;
   document.getElementById("switchToRegister").onclick = function(){
         index.renderRegister();
   };
   document.getElementById("login").onclick = function(){
      var username = Utils.getCredential("username").value,
      password = Utils.getCredential("password").value;
       var success = true;
      //var success = Database.checkUser(username, password);

      // if (!success){
      //    $('#loginError').css("display", 'block');
      // }

      if(success){
         var userInfo = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            achievements:'none. ever.',
         };
         index.setUserInfo(userInfo);
         index.renderSideBar();
         index.renderGraph();
      }
   };
}

module.exports = LoginController;
