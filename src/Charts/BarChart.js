import React, { useEffect } from "react";
import * as d3 from "d3";

export default function BarChart() {
  useEffect(() => {
    draw();
  }, []);

  let draw = () => {
    d3.select("#bar_chart").select("svg").remove();

    let margin = { left: 70, bottom: 30, right: 10, top: 10 };
    let width = 900;
    let height = 450;

    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let data = months.map((i) => {
      return {
        month: i,
        red: d3.randomInt(0, 45000)(),
        green: d3.randomInt(0, 37000)(),
        black: d3.randomInt(0, 60000)(),
      };
    });

    let svg = d3
      .select("#bar_chart")
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
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    let xScale = d3
      .scaleBand()
      .range([0, width])
      .domain(
        data.map((d) => {
          return d.month;
        })
      )
      .padding(0.3);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")  
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)");

    let yScale = d3.scaleLinear().domain([0, 60000]).range([height, 0]);

    svg
      .append("g")
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat((d) => Math.ceil(Number(d) / 1000) + 'K')
      );

    svg
      .selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.month))
      .attr("y", (d) => yScale(d.black))
      .attr("width", xScale.bandwidth() / 3)
      .attr("height", (d) => height - yScale(d.black))
      .attr("fill", "#428a80");

    svg
      .selectAll("bars1")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.month) + xScale.bandwidth() / 3)
      .attr("y", (d) => yScale(d.red))
      .attr("width", xScale.bandwidth() / 3)
      .attr("height", (d) => height - yScale(d.red))
      .attr("fill", "#2b3537");

    svg
      .selectAll("bars2")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.month) + (2 * xScale.bandwidth()) / 3)
      .attr("y", (d) => yScale(d.green))
      .attr("width", xScale.bandwidth() / 3)
      .attr("height", (d) => height - yScale(d.green))
      .attr("fill", "#ae4744");
  };

  return <div id="bar_chart" className="chart"></div>;
}
