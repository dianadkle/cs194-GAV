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
      $('#lastNameError').css("display", 'none');
      $('#emailError').css("display", 'none');
      $('#usernameError').css("display", 'none');
      $('#passwordError').css("display", 'none');
      $('#confirmPasswordError').css("display", 'none');
   }

   document.getElementById("register").onclick = function(){
      clearErrors();
      var firstName = document.getElementById("firstName").value,
      lastName = document.getElementById("lastName").value,
      username = document.getElementById("username").value,
      email = document.getElementById("email").value,
      password = document.getElementById("password").value,
      confirmPassword = document.getElementById("confirmPassword").value;
      var successful = true;

      if(firstName === null || firstName === ""){
         $('#firstNameError').css("display", 'block');
         successful = false;
      }
      if(lastName === null || lastName === ""){
         $('#lastNameError').css("display", 'block');
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


      if(successful){
         /*TODO: maybe bring to a welcome page instead??*/
         $.post("http://127.0.0.1:3000", {
            'firstname': firstName,
            'lastname': lastName,
            'email': email,
            'username': username,
            'password': password,
            'graphs': {"key": "value"},
            'num_graphs': 0,
            'achievements': {
               'one_graph': false,
               'five_graphs': false,
               'ten_graphs': false,
               'twenty_five_graphs': false,
               'make_account': true,
               'update_account': false,
               'save_graph': false,
               'load_graph': false,
               'run_algorithm': false,
               'run_nfadfa': false,
               'one_quiz_correct': false
            }
         }, 
             function(data, status){ console.log("data: "+data);
         });
         var userInfo = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            achievements:'',
         };
         index.setUserInfo(userInfo);
         index.renderSideBar();
         index.renderGraph();
      }
   };
};

module.exports = RegisterController;
