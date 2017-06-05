'use strict';

var Handlebars = require('handlebars');
function TemplateExtractor(){
   Handlebars.getTemplate = function(name) {
       if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
           $.ajax({
               url : 'templates/' + name + '.hbs',
               success : function(data) {
                   if (Handlebars.templates === undefined) {
                       Handlebars.templates = {};
                   }
                   Handlebars.templates[name] = Handlebars.compile(data);
               },
               async : false
           });
       }
       return Handlebars.templates[name];
   };
};

TemplateExtractor.prototype.getTemplate = function(name){
   return Handlebars.getTemplate(name);
}
module.exports = TemplateExtractor;
