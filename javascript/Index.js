'use strict';

window.onload = function(){

   var data = [ "oh", "my", "gosh" ];
   var p = d3.select("body").selectAll("p")
      .data(data)
      .enter()
      .append("p").text(function(d, i){return (i + 1) + ': ' +  d + '!';});

   //var ohData = p._groups[0][0/1/2].__data__;


   var addNodeButton = document.getElementById('addNodeButton');
   addNodeButton.addEventListener("click", function(){
      window.alert('This is an example of how to add events');
   });
};
