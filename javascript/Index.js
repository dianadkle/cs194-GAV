'use strict';

var TemplateExtractor = require('./TemplateExtractor');
var Templates = new TemplateExtractor();
var Utils = require('./Utils');

var LoginController = require('./controllers/LoginController');
var RegisterController = require('./controllers/RegisterController');
var GraphCanvasController = require('./controllers/GraphCanvasController');
/***********************************Index.js***********************************/


function Index(){
   var docBody = document.getElementsByTagName("body")[0];

   /*templates*/
   var graphCanvasTemplate = Templates.getTemplate('GraphCanvas');
   var loginTemplate = Templates.getTemplate('Login');
   var registerTemplate = Templates.getTemplate('Register');

    // how to get template HTML
    /*
    var graphCanvasHTML = graphCanvasTemplate({});
    var loginHTML = loginTemplate({});
    var registerHTML = registerTemplate({});
    */

   //GraphCanvas Rendering stuff
   Index.prototype.renderGraphCanvas = function(userInfo){
      docBody.innerHTML = graphCanvasTemplate({});
      var graphCanvasController = new GraphCanvasController(userInfo);
      graphCanvasController.control();
   };

   Index.prototype.renderLogin = function(){
      var loginController = new LoginController(this);
      docBody.innerHTML = loginTemplate({});
      loginController.control();
   };

   //GraphCanvas Rendering stuff
   Index.prototype.renderRegister = function(){
      var registerController = new RegisterController(this);
      docBody.innerHTML = registerTemplate({});
      registerController.control();
   };
};

window.onload = function(){
   var index = new Index();
   index.renderLogin();
};
