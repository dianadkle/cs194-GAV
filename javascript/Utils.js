'use strict';

function createTuple(name, age){
   return Object.freeze({name: name, age: age});
}

'use strict';

var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August",
                                        "September", "October", "November", "December"];
var cs142FormatTime = function(d){
    var day = days[d.getDay()];
    var month = months[d.getMonth()];
    var date = d.getDate();
    var year = d.getFullYear();
    var str = day + ", " + month + " " + date + ", " + year + " ";
    str += formatTime(d);   //helper function
    return str;
};
