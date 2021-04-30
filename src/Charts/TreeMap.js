import React, { useEffect } from "react";
import * as d3 from "d3";

const TreeMap = () => {
  useEffect(() => {
    draw();
  });

  let draw = () => {
    let margin = { top: 10, right: 10, bottom: 10, left: 10 };
    let width = 640;
    let height = 270;

    let svg = d3
      .select("#treemap")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`
      )
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let data = {"children":[{"name":"boss1","children":[{"name":"mister_a","group":"A","value":28,"colname":"level3"},{"name":"mister_b","group":"A","value":19,"colname":"level3"},{"name":"mister_c","group":"C","value":18,"colname":"level3"},{"name":"mister_d","group":"C","value":19,"colname":"level3"}],"colname":"level2"},{"name":"boss2","children":[{"name":"mister_e","group":"C","value":14,"colname":"level3"},{"name":"mister_f","group":"A","value":11,"colname":"level3"},{"name":"mister_g","group":"B","value":15,"colname":"level3"},{"name":"mister_h","group":"B","value":16,"colname":"level3"}],"colname":"level2"},{"name":"boss3","children":[{"name":"mister_i","group":"B","value":10,"colname":"level3"},{"name":"mister_j","group":"A","value":13,"colname":"level3"},{"name":"mister_k","group":"A","value":13,"colname":"level3"},{"name":"mister_l","group":"D","value":25,"colname":"level3"},{"name":"mister_m","group":"D","value":16,"colname":"level3"},{"name":"mister_n","group":"D","value":28,"colname":"level3"}],"colname":"level2"}],"name":"CEO"}
   
    var root = d3.hierarchy(data).sum(function(d){ return d.value}) // Here the size of each leave is given in the 'value' field in input data

  // Then d3.treemap computes the position of each element of the hierarchy
  d3.treemap()
    .size([width, height])
    .padding(2)
    (root)

  // use this information to add rectangles:
  svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "black")
      .style("fill", "slateblue")

  // and to add the text labels
  svg
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
      .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
      .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
      .text(function(d){ return d.data.name })
      .attr("font-size", "15px")
      .attr("fill", "white")
  };

  return <div id="treemap"></div>;
};

export default TreeMap;
