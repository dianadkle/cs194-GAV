'use strict';

var TemplateExtractor = require('./TemplateExtractor');
var Templates = new TemplateExtractor();
var Utils = require('./Utils');

var LoginController = require('./controllers/LoginController');
var RegisterController = require('./controllers/RegisterController');
var GraphController = require('./controllers/GraphController');
var AlgorithmsController = require('./controllers/AlgorithmsController');
var AutomataController = require('./controllers/AutomataController');
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

   var graphTemplate = Templates.getTemplate('mainTemplates/graphTemplate');
   var automataTemplate = Templates.getTemplate('mainTemplates/automataTemplate');
   var profileTemplate = Templates.getTemplate('mainTemplates/profileTemplate');
   var algorithmsTemplate = Templates.getTemplate('mainTemplates/algorithmsTemplate');

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
      var userInfo = {name: 'Angel'};
      sideColumn.html(sideBarTemplate(userInfo));

      document.getElementById('profileBar').onclick = function(){
         //TODO
      };

      document.getElementById('algorithmsBar').onclick = function(){
         mainColumn.html(algorithmsTemplate(userInfo));
         var algorithmsController = new AlgorithmsController(algorithms);
         algorithmsController.control()
      };
      document.getElementById('graphBar').onclick = function(){
         mainColumn.html(graphTemplate(userInfo));
         var graphController = new GraphController(userInfo);
         graphController.control();
      };

      document.getElementById('automataBar').onclick = function(){
         mainColumn.html(automataTemplate(userInfo));
         var automataController = new AutomataController();
         automataController.control();
      };

      $('#sideColumn').css('display', 'inline');
      if(/*TODO: user logged in*/true){
         $('#userProfile').css('display', 'inline');
      }
   };

   //GraphCanvas Rendering stuff
   Index.prototype.renderGraph = function(userInfo){
      mainColumn.html(graphTemplate({}));
      var graphController = new GraphController(userInfo);

      $('#toolBox').css("display", "inline");
      $('#sideBar').css("display", "inline");

      $('#switchToAutomata').css("visibility", "hidden");
      $('#switchToGraph').css("visibility", "visible");

      graphController.control();
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
