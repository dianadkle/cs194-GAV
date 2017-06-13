'use strict';
var Utils = require('../Utils');

function ProfileController(userInfo){
   this.userInfo = userInfo;
};

ProfileController.prototype.control = function(){
   var user;
   var u_name = this.userInfo.username;
   $.get("http://127.0.0.1:3000", function (data) {
      for (var i = 0; i < data.length; i++){
         console.log("data:"+data[i].username);
         console.log("profile:"+u_name);
         if (data[i].username === u_name){
            user = data[i];
         }
      }
      console.log(user);
      if (user.achievements.save_graph === "true"){
         $('#save_graph').css('display', 'inline');
         $('#saveGraphText').css('display', 'inline');
      } else {
         $('#save_graph').css('display', 'none');
         $('#saveGraphText').css('display', 'none');
      }
      if (user.achievements.one_graph === "true"){
         $('#1_graph').css('display', 'inline');
         $('#oneGraphSaved').css('display', 'inline');
      } else {
         $('#oneGraphSaved').css('display', 'none');
         $('#oneGraphSaved').css('display', 'none');
      }
      if (user.achievements.five_graphs === "true"){
         $('#5_graphs').css('display', 'inline');
         $('#fiveGraphsSaved').css('display', 'inline');
      } else {
         $('#5_graphs').css('display', 'none');
         $('#fiveGraphsSaved').css('display', 'none');
      }
      if (user.achievements.ten_graphs === "true"){
         $('#10_graphs').css('display', 'inline');
         $('#tenGraphsSaved').css('display', 'inline');
      } else {
         $('#10_graphs').css('display', 'none');
         $('#tenGraphsSaved').css('display', 'none');
      }
      if (user.achievements.twenty_five_graph === "true"){
         $('#25_graphs').css('display', 'inline');
         $('#twentyFiveGraphsSaved').css('display', 'inline');
      } else {
         $('#25_graphs').css('display', 'none');
         $('#twentyFiveGraphsSaved').css('display', 'none');
      }
      if (user.achievements.update_account === "true"){
         $('#update_account').css('display', 'inline');
         $('#updateAccount').css('display', 'inline');
      } else {
         $('#update_account').css('display', 'none');
         $('#updateAccount').css('display', 'none');
      }
      if (user.achievements.load_graph === "true"){
         $('#load_graph').css('display', 'inline');
         $('#loadGraph').css('display', 'inline');
      } else {
         $('#load_graph').css('display', 'none');
         $('#loadGraph').css('display', 'none');
      }
      if (user.achievements.run_algorithm === "true"){
         $('#run_algorithm').css('display', 'inline');
         $('#runAlgorithm').css('display', 'inline');
      } else {
         $('#run_algorithm').css('display', 'none');
         $('#runAlgorithm').css('display', 'none');
      }
      if (user.achievements.run_nfadfa === "true"){
         $('#run_nfadfa').css('display', 'inline');
         $('#runNFADFA').css('display', 'inline');
      } else {
         $('#run_nfadfa').css('display', 'none');
         $('#runNFADFA').css('display', 'none');
      }
      if (user.achievements.one_quiz_correct === "true"){
         $('#one_quiz_correct').css('display', 'inline');
         $('#oneQuizCorrect').css('display', 'inline');
      } else {
         $('#one_quiz_correct').css('display', 'none');
         $('#oneQuizCorrect').css('display', 'none');
      }
   });
   // document.getElementById("switchToLogin").onclick = function(){
   //    index.renderLogin();
   // };
   //
   // function clearErrors(){
   //    $('#firstNameError').css("display", 'none');
   //    $('#lastNameError').css("display", 'none');
   //    $('#emailError').css("display", 'none');
   //    $('#usernameError').css("display", 'none');
   //    $('#passwordError').css("display", 'none');
   //    $('#confirmPasswordError').css("display", 'none');
   // }
   //
   // document.getElementById("register").onclick = function(){
   //    clearErrors();
   //    var firstName = Utils.getCredential("firstName"),
   //    lastName = Utils.getCredential("lastName"),
   //    username = Utils.getCredential("username"),
   //    email = Utils.getCredential("email"),
   //    password = Utils.getCredential("password"),
   //    confirmPassword = Utils.getCredential("confirmPassword");
   //    var successful = true;
   //
   //    if(firstName === null || firstName === ""){
   //       $('#firstNameError').css("display", 'block');
   //       successful = false;
   //    }
   //    if(lastName === null || lastName === ""){
   //       $('#lastNameError').css("display", 'block');
   //       successful = false;
   //    }
   //
   //    if(email === null || email === ""){
   //       $('#emailError').css("display", 'block');
   //       successful = false;
   //    }
   //
   //    if(username === null || username === ""){
   //       $('#usernameError').css("display", 'block');
   //       successful = false;
   //    }
   //
   //    if(password === null || password === ""){
   //       $('#passwordError').css("display", 'block');
   //       successful = false;
   //    } else if (confirmPassword !== password){
   //       $('#confirmPasswordError').css("display", 'block');
   //       successful = false;
   //    }
   //
   //    //TODO: check registration credentials
   //
   //
   //    if(successful){
   //       /*TODO: maybe bring to a welcome page instead??*/
   //       index.renderGraphCanvas({
   //          username: username,
   //          user_id: 0
   //       });
   //    }
   //};
};

module.exports = ProfileController;
