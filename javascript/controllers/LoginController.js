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
      var username = document.getElementById("username").value,
      password = document.getElementById("password").value;
       var success = true;
      //var success = Database.checkUser(username, password);

      // if (!success){
      //    $('#loginError').css("display", 'block');
      // }
      var user;
      $.get("http://127.0.0.1:3000", function (data) {
         console.log(data);
         console.log(user_name);
         for (var i = 0; i < data.length; i++){
            console.log(data[i].username);
            console.log(data[i].username.localeCompare(user_name));
            if (data[i].username.localeCompare(user_name) === 0){
                if (data[i].password.localeCompare(password) === 0) {
                   user = data[i];
                    success = true;
                    break;
                }
            }
         }
         if(success){
            var userInfo = {
               //TODO: edit to reflect appropriate first name, last name, etc.
               firstName: user.firstname,
               lastName: 'Trump',
               username: user.username,
               email: 'donald@trump.whitehouse.gov',
               achievements:'none. ever.',
            };
            index.setUserInfo(userInfo);
             index.renderSideBar();
             index.renderGraph({
                username: username,
                user_id: 0
             });
          }
      });
   };
}

module.exports = LoginController;
