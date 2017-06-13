'use strict';

var TemplateExtractor = require('./TemplateExtractor');
var Templates = new TemplateExtractor();
var Utils = require('./Utils');

var LoginController = require('./controllers/LoginController');
var RegisterController = require('./controllers/RegisterController');
var ProfileController = require('./controllers/ProfileController');
var GraphController = require('./controllers/GraphController');
var AutomataController = require('./controllers/AutomataController');
/***********************************Index.js***********************************/

var algorithms = [
   "Depth-First Search",
   "Breadth-First Search",
   "Dijkstra's Algorithm"
];


function Index(){
   var mainDIV = $('#mainDIV');
   var sideColumn = $('#sideColumn');

   /*templates*/
   var loginTemplate = Templates.getTemplate('Login');
   var registerTemplate = Templates.getTemplate('Register');
   var sideBarTemplate = Templates.getTemplate('SideBar');

   var graphTemplate = Templates.getTemplate('mainTemplates/graphTemplate');
   var automataTemplate = Templates.getTemplate('mainTemplates/automataTemplate');
   var profileTemplate = Templates.getTemplate('mainTemplates/profileTemplate');

    // how to get template HTML
    /*
    var graphCanvasHTML = graphCanvasTemplate({});
    var loginHTML = loginTemplate({});
    var registerHTML = registerTemplate({});
    */


   Index.prototype.renderLogin = function(){
      mainDIV.html(loginTemplate({}));
      var loginController = new LoginController(this);

      $('#toolBox').css("display", "none");
      $('#sideBar').css("display", "none");

      loginController.control();
   };

   //GraphCanvas Rendering stuff
   Index.prototype.renderRegister = function(){
      mainDIV.html(registerTemplate({}));
      var registerController = new RegisterController(this);

      $('#toolBox').css("display","none");
      $('#sideBar').css("display", "none");

      registerController.control();
   };

   Index.prototype.setUserInfo = function(userInfo){
      this.userInfo = userInfo;
   };


   /*must be called before renderGraphCanvas or renderAutomata*/
   Index.prototype.renderSideBar = function(){
      var userInfo = this.userInfo;
      //TODO: get user info
      sideColumn.html(sideBarTemplate(userInfo));

      document.getElementById('profileBar').onclick = function(){
         mainDIV.html(profileTemplate(userInfo));
         var profileController = new ProfileController(userInfo);
         profileController.control();
      };

      document.getElementById('graphBar').onclick = function(){
         mainDIV.html(graphTemplate(userInfo));
         var graphController = new GraphController(userInfo);
         graphController.control(algorithms);
      };

      document.getElementById('automataBar').onclick = function(){
         mainDIV.html(automataTemplate(userInfo));
         var automataController = new AutomataController();
         automataController.control();
      };

      $('#sideColumn').css('display', 'inline');
      if(/*TODO: user logged in*/true){
         $('#userProfile').css('display', 'inline');
      }
   };

   //GraphCanvas Rendering stuff
   Index.prototype.renderGraph = function(){
      var userInfo = this.userInfo;
      mainDIV.html(graphTemplate(userInfo));

      var graphController = new GraphController(userInfo);

      $('#toolBox').css("display", "inline");
      $('#sideBar').css("display", "inline");

      graphController.control(algorithms);
   };

   //GraphCanvas Rendering stuff
   Index.prototype.renderAutomata = function(){
      var userInfo = this.userInfo;
      mainDIV.html(automataTemplate({}));

      var automataController = new AutomataController(userInfo);

      $('#toolBox').css("display", "inline");
      $('#sideBar').css("display", "inline");

      automataController.control();
   };

   Index.prototype.renderProfile = function(){
      var userInfo = this.userInfo;
      mainDIV.html(profileTemplate(userInfo));

      var profileController = new ProfileController(userInfo);

      $('#toolBox').css("display", "inline");
      $('#sideBar').css("display", "inline");

      profileController.control();
   };
};

window.onload = function(){
   var index = new Index();
   index.renderLogin();
};
