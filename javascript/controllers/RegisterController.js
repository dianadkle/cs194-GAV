'use strict';
var Utils = require('../Utils');

function RegisterController(index){
   this.index = index;
};

RegisterController.prototype.control = function(){
   var index = this.index;
   document.getElementById("switchToLogin").onclick = function(){
      index.renderLogin();
   };

   function clearErrors(){
      $('#firstNameError').css("display", 'none');
      $('#emailError').css("display", 'none');
      $('#usernameError').css("display", 'none');
      $('#passwordError').css("display", 'none');
      $('#confirmPasswordError').css("display", 'none');
   }

   document.getElementById("register").onclick = function(){
      clearErrors();
      var firstName = Utils.getCredential("firstName"),
      username = Utils.getCredential("username"),
      email = Utils.getCredential("email"),
      password = Utils.getCredential("password"),
      confirmPassword = Utils.getCredential("confirmPassword");
      var successful = true;

      if(firstName === null || firstName === ""){
         $('#firstNameError').css("display", 'block');
         successful = false;
      }

      if(email === null || email === ""){
         $('#emailError').css("display", 'block');
         successful = false;
      }

      if(username === null || username === ""){
         $('#usernameError').css("display", 'block');
         successful = false;
      }

      if(password === null || password === ""){
         $('#passwordError').css("display", 'block');
         successful = false;
      } else if (confirmPassword !== password){
         $('#confirmPasswordError').css("display", 'block');
         successful = false;
      }

      //TODO: check registration credentials


      if(successful){
         /*TODO: maybe bring to a welcome page instead??*/
         index.renderGraphCanvas({
            username: username,
            user_id: 0
         });
      }
   };
};

module.exports = RegisterController;
