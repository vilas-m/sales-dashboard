import React, { useEffect } from "react";
import * as d3 from "d3";
import "./chartStyles.scss";
import moment from "moment";

const LineChart = () => {
  let data = [];

  useEffect(() => {
    draw();
  });

  let draw = () => {
    d3.select("#lineChart").select("svg").remove();

    let width = 640;
    let height = 270;
    let margin = { left: 40, right: 20, top: 10, bottom: 20 };

    for (let i = 0; i < 30; i++) {
      let high = d3.randomInt(0, 21 + i)();
      let value1 = high;

      let value2 = Math.abs(d3.randomInt(value1 - 8, value1)());
      let value3 = Math.abs(d3.randomInt(value2 - 8, value2)());
      let value4 = Math.abs(d3.randomInt(value3 - 8, value3)());
      let value5 = Math.abs(d3.randomInt(value4 - 8, value4)());
      let value6 = Math.abs(d3.randomInt(value5 - 8, value5)());
      data.push({
        date: moment()
          .add(-200 + i, "days")
          .utc(),
        value1,
        value2,
        value3,
        value4,
        value5,
        value6,
      });
    }

    let svg = d3
      .select("#lineChart")
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
      .scaleTime()
      .domain([
        data[0]["date"].valueOf(),
        data[data.length - 1]["date"].valueOf(),
      ])
      .range([0, width])
      .nice();

    let yScale = d3.scaleLinear().domain([0, 50]).range([height, 0]);

    svg
      .append("g")
      .style("opacity", 0.5)
      .call(d3.axisLeft(yScale).ticks(5).tickSize(0).tickPadding(20))
      .call((g) => g.select(".domain").remove());

    svg
      .append("g")
      .style("opacity", 0.5)
      .call(d3.axisBottom(xScale).ticks(4).tickSize(0).tickPadding(10))
      .attr("transform", `translate(0, ${height})`)
      .call((g) => g.select(".domain").remove());

    let appendPath = (color, varaible) => {
      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 1.5)
        .attr(
          "d",
          d3
            .line()
            .x((d) => {
              return xScale(d.date);
            })
            .y((d) => {
              return yScale(d[varaible]);
            })
        );
    };

    appendPath("#e38960", "value1");
    appendPath("#090d0f", "value2");
    appendPath("#d36463", "value3");
    appendPath("#397690", "value4");
    appendPath("#d9b51d", "value5");
    appendPath("#63bcb4", "value6");
  };

  return <div className={"chart"} id={"lineChart"}></div>;
};

export default LineChart;
