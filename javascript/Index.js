'use strict';

var TemplateExtractor = require('./TemplateExtractor');
var Templates = new TemplateExtractor();
var Utils = require('./Utils');

var LoginController = require('./controllers/LoginController');
var RegisterController = require('./controllers/RegisterController');
var GraphCanvasController = require('./controllers/GraphCanvasController');
var SideBarController = require('./controllers/SideBarController');
/***********************************Index.js***********************************/

var algorithms = [
   "Depth-First Search",
   "Breadth-First Search",
   "Dijkstra's Algorithm"
];

function Index(){
   var mainColumn = $('#mainColumn');
   var sideColumn = $('#sideColumn');

   /*templates*/
   var graphCanvasTemplate = Templates.getTemplate('GraphCanvas');
   var automataTemplate = Templates.getTemplate('Automata');
   var loginTemplate = Templates.getTemplate('Login');
   var registerTemplate = Templates.getTemplate('Register');
   var sideBarTemplate = Templates.getTemplate('SideBar');

    // how to get template HTML
    /*
    var graphCanvasHTML = graphCanvasTemplate({});
    var loginHTML = loginTemplate({});
    var registerHTML = registerTemplate({});
    */


   Index.prototype.renderLogin = function(){
      mainColumn.html(loginTemplate({}));
      var loginController = new LoginController(this);

      $('#toolBox').css("display", "none");
      $('#sideBar').css("display", "none");

      loginController.control();
   };

   //GraphCanvas Rendering stuff
   Index.prototype.renderRegister = function(){
      mainColumn.html(registerTemplate({}));
      var registerController = new RegisterController(this);

      $('#toolBox').css("display","none");
      $('#sideBar').css("display", "none");

      registerController.control();
   };


   /*must be called before renderGraphCanvas or renderAutomata*/
   Index.prototype.renderSideBar = function(){
      //TODO: get user info
      sideColumn.html(sideBarTemplate({name: 'Angel'}));
      var sideBarController = new SideBarController(algorithms);
      $('#sideColumn').css('display', 'inline');
      if(/*TODO: user logged in*/true){
         $('#userProfile').css('display', 'inline');
      }

      sideBarController.control();
   };

   //GraphCanvas Rendering stuff
   Index.prototype.renderGraphCanvas = function(userInfo){
      mainColumn.html(graphCanvasTemplate({}));
      var graphCanvasController = new GraphCanvasController(userInfo);

      $('#toolBox').css("display", "inline");
      $('#sideBar').css("display", "inline");

      $('#switchToAutomata').css("visibility", "hidden");
      $('#switchToGraph').css("visibility", "visible");

      graphCanvasController.control();

   };

   //GraphCanvas Rendering stuff
   Index.prototype.renderAutomata = function(userInfo){
      mainColumn.html(automataTemplate({}));

      var automataController = new AutomataController(userInfo);

      $('#toolBox').css("display", "inline");
      $('#sideBar').css("display", "inline");

      $('#switchToAutomata').css("visibility", "visible");
      $('#switchToGraph').css("visibility", "hidden");

      automataController.control();
   };
};

window.onload = function(){
   var index = new Index();
   index.renderLogin();
};
