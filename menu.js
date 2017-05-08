document.onload = (function(){
	"use strict";
	var data = [
		{name: "foo", links: ["a", "b", "c"]},
		{name: "bar", links: ["d", "e", "f"]}
	];

	var ul = d3.select("ul");

	ul.selectAll("li")
		.data(data)
    .enter().append("li")
		.text(function(d) { return d.name; })
		.on("click", expand);

	function expand(d) {
	d3.select(this)
	    .on("click", null)
	  .append("ul")
	  .selectAll("li")
	    .data(d.links)
	  .enter().append("li")
	    .text(function(d) { return d; });
	}
});