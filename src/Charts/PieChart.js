import React, { useEffect } from "react";
import * as d3 from "d3";
import "./chartStyles.scss";

export default function PieChart() {
  useEffect(() => {
    draw();
  }, []);

  let draw = () => {
    d3.select("#pie_chart").select("svg").remove();

    let margin = 10;
    let width = 410;
    let height = 310;
    let data = [
      {
        name: "Natura",
        value: 30,
      },
      {
        name: "Alqua",
        value: 20,
      },
      {
        name: "lama",
        value: 18,
      },
      {
        name: "Palma",
        value: 16,
      },
      {
        name: "Curra",
        value: 13,
      },
      {
        name: "Qubus",
        value: 8,
      },
      {
        name: "Luo",
        value: 13,
      },
    ];

    let radius = Math.min(width, height) / 3 - margin;

    let svg = d3
      .select("#pie_chart")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width + 2 * margin} ${height + 2 * margin}`)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    let pie = d3.pie().value((d) => {
      return d.value;
    });

    let arc = d3
      .arc()
      .innerRadius(radius * 0.5) // This is the size of the donut hole
      .outerRadius(radius * 0.8);

    let outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    let data_ready = pie(data);

    svg
      .selectAll("slices")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
      .attr("fill", (d) => {
        return d3.schemeDark2[d.index];
      });

    svg
      .selectAll("allPolylines")
      .data(data_ready)
      .enter()
      .append("polyline")
      .attr("stroke", "black")
      .style("fill", "none")
      .attr("stroke-width", 1)
      .attr("points", function (d) {
        let posA = arc.centroid(d); // line insertion in the slice
        let posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        let posC = outerArc.centroid(d); // Label position = almost the same as posB
        let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC];
      });

    // Add the polylines between chart and labels:
    svg
      .selectAll("allLabels")
      .data(data_ready)
      .enter()
      .append("text")
      .text(function (d) {
        console.log(d.data.name);
        return d.data.name;
      })
      .attr("class", "pie-text")
      .attr("transform", function (d) {
        let pos = outerArc.centroid(d);
        let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return "translate(" + pos + ")";
      })
      .style("text-anchor", function (d) {
        let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? "start" : "end";
      });
  };

  return <div className="pieChart" id="pie_chart"></div>;
}
