import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "./chartStyles.scss";

const HorizontalBarChart = () => {
  useEffect(() => {
    draw();
  });

  let draw = () => {
    d3.select("#h_bar_chart").select("svg").remove();

    let width = 400;
    let height = 350;
    let margin = { left: 70, right: 20, top: 10, bottom: 20 };
    let productNames = [
      "Productivity",
      "Convenience",
      "Extreme",
      "Moderation",
      "Select",
      "Youth",
      "All Season",
      "Regular",
    ];

    let data = productNames.map((i) => ({
      product: i,
      sales: d3.randomInt(1000000, 10000000)() / 1000000,
    }));

    data = data.sort((a, b) =>
      a.sales > b.sales ? 1 : b.sales > a.sales ? -1 : 0
    );

    let svg = d3
      .select("#h_bar_chart")
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

    let yScale = d3
      .scaleBand()
      .range([height, 0])
      .domain(
        data.map((d) => {
          return d.product;
        })
      )
      .padding(0.2);

    svg
      .append("g")
      .call(d3.axisLeft(yScale).tickSize(0).tickPadding(7))
      .call((g) => g.select(".domain").remove());

    let xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.sales)])
      .range([0, width]);

    svg
      .append("g")
      .call(
        d3
          .axisBottom(xScale)
          .ticks(5)
          .tickSize(0)
          .tickPadding(7)
          .tickFormat((d) => d + " M")
      )
      .attr("transform", `translate(0, ${height})`)
      .call((g) => g.select(".domain").remove());

    svg
      .selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", (d) => yScale(d.product))
      .attr("x", 0)
      .attr("height", yScale.bandwidth())
      .attr("width", (d) => xScale(d.sales))
      .attr("fill", "#428a80");
  };

  return <div id={"h_bar_chart"} className="chart"></div>;
};

export default HorizontalBarChart;
