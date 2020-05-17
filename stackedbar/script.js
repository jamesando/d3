// 1. Set the margins
var margin = {top: 50, right: 30, bottom: 30, left: 80},
    width = 580 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// 2. Append the SVG (in this example its called "retstack")
var retstack = d3.select("#container")
  .append("svg")
    .attr("class", "chart")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 900 350")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// 3. Define the div for the tooltip
var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);
      

// 4. Get the data and create the chart
d3.json("data.json", function(data) {

    // Set the X axis scale
    var x = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.05)
        .align(0.1);

    // Set the Y axis scale
    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    // Set the color list
    var z = d3.scaleOrdinal()
        .range(["#2980b9",  "#27ae60", "#e74c3c"]);

    // Format the data
    data.forEach(function(d) {
        d.productA = +d.productA,
        d.productB = +d.productB,
        d.productC = +d.productC;
    });

    // Fix pre-processing
    var keys = [];
    for (key in data[0]){
        if (key != "date")
        keys.push(key);
    }
    data.forEach(function(d){
        d.total = 0;
        keys.forEach(function(k){
        d.total += d[k];
        })
    });


    x.domain(data.map(function(d) {
        return d.date;
    }));
    y.domain([0, d3.max(data, function(d) {
        return d.total;
    })]).nice();
    z.domain(keys);


    retstack.append("g")
        .selectAll("g")
        .data(d3.stack().keys(keys)(data))
        .enter().append("g")
        .attr("fill", function(d) {
            return z(d.key);
        })
        .selectAll("rect")
        .data(function(d) {
            return d;
        })
        .enter().append("rect")
        .attr("x", function(d) {
            return x(d.data.date);
        })
        .attr("y", function(d) {
            return y(d[1]);
        })
        .attr("height", function(d) {
            return y(d[0]) - y(d[1]);
        })
        .attr("width", x.bandwidth())
        // This section creates the toolkit on mouse over
        .on("mouseover", function(d) {
            var subgroupName = d3.select(this.parentNode).datum().key;
            var subgroupValue = d.data[subgroupName];
            div.transition()		
            .duration(200)		
            .style("opacity", .9);	
            div.html((d.data.date + "</br>" + subgroupName + "</br>" + subgroupValue))	
            .style("left", (d3.event.pageX) + "px")   
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()		
                .duration(500)		
                .style("opacity", 0);
    });

    // add the x Axis
    retstack.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    // add the y Axis
    retstack.append("g")
        .call(d3.axisLeft(y));

    // Add the title
    retstack.append("text")
        .attr("x", (0-margin.left+10))             
        .attr("y", 0 - (margin.top / 1.7))
        .attr("class", "title")
        .text("This is the title of the chart");

    // Add the subtitle
    retstack.append("text")
        .attr("x", (0-margin.left+10))             
        .attr("y", 0 - (margin.top / 3))
        .attr("class", "subtitle")
        .text("This is a subtitle used to provide further description");

    // Add Legend "Dots"
    retstack.selectAll("mydots")
        .data(d3.stack().keys(keys)(data))
        .enter()
        .append("circle")
        .attr("cy", -5)
        .attr("cx", function(d,i){ return (i*150) + 50}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 4)
        .style("fill", function(d,i){ return z(i)})

    // Add Legend Labels
    retstack.selectAll("mylabels")
        .data(d3.stack().keys(keys)(data))
        .enter()
        .append("text")
        .attr("y", -5)
        .attr("x", function(d,i){ return (i*150) + 65}) // 100 is where the first dot appears. 25 is the distance between dots
        .text(function(d){ return d.key})
        .style("fill", function(d,i){ return z(i)})
        .attr("text-anchor", "left")
        .attr("class", "chartLabel")
        .style("alignment-baseline", "middle")

});