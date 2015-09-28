var dataset, full_dataset;

d3.json("oscar_winners.json", function (data) {
        full_dataset = data;
        dataset = full_dataset.slice(0,35);
        gen_vis();
        })

function gen_vis() {
    var w = 800;
    var h = 400;
    var padding=30;
    
    var svg = d3.select("#the_chart")
    .append("svg")
    .attr("width",w)
    .attr("height",h);
    
    var hscale = d3.scale.linear()
    .domain([10,0])
    .range([padding,h-padding]);
    
    var xscale = d3.scale.linear()
    .domain([0,dataset.length])
    .range([padding,w-padding]);
    
    var bar_w = Math.floor((w-padding*2)/dataset.length)-1;
    
    var	r =	5;
    
    
    svg.selectAll("circle")
       .data(full_dataset)
       .enter().append("circle")
       .attr("r",r)
       .attr("fill","rgba(0,128,0,0.5)")
       .attr("cx",function(d, i)	{
             return xscale(d.budget/1000000);
             })
       .attr("cy",function(d)	{
             return hscale(d.rating);
             })
       .select("title")
       .text(function(d) { return d.title;});

    var yaxis = d3.svg.axis()
    .scale(hscale)
    .orient("left");
    
    svg.append("g")
	   .attr("transform","translate(30,0)")
	   .attr("class","axis")
	   .call(yaxis);
    
    var xaxis = d3.svg.axis()
    .scale(d3.scale.linear()
           .domain([0,200])
           .range([padding,w-padding-bar_w/2]))
    .tickFormat(d3.format("f"))
    .ticks(dataset.length/2)
    .orient("bottom");
    
    svg.append("g")
	   .attr("transform","translate(0,"+ (h-padding) +")")
	   .attr("class","x axis")
	   .call(xaxis);
    
    var	xscale = d3.scale.linear()
    .domain([0,d3.max(full_dataset,	function(d)	{
                      return d.budget;})/1000000])
    .range([padding,w-padding]);

}