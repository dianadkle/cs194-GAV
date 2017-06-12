'use strict';
var Utils = require('../Utils');

function LoginController(index){
   this.index = index;
};

LoginController.prototype.control = function(){
   var index = this.index;
   document.getElementById("switchToRegister").onclick = function(){
         index.renderRegister();
   };
   document.getElementById("login").onclick = function(){
      var username = Utils.getCredential("username").value,
      password = Utils.getCredential("password");
      //TODO: check registration credentials
      if(/*successful credentials*/true){
         index.renderSideBar();
         index.renderGraphCanvas({
            username: username,
            user_id: 0
         });
      }
   };
}

module.exports = LoginController;
