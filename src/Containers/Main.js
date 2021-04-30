import React from "react";
import HorizontalBarChart from "../Charts/HorizontalBarChart";
import BarChart from "../Charts/BarChart";
import "./styles.scss";
import TreeMap from "../Charts/TreeMap";
import LineChart from "../Charts/LineChart";
import PieChart from "../Charts/PieChart";

const Main = () => {
  return (
    <div className="main">
      <div className="top">
        <div className="t-1">
          <HorizontalBarChart />
        </div>
        <div className="t-2">
          <BarChart />
        </div>
        <div className="t-3">
          <PieChart />
        </div>
      </div>
      <div className="bottom">
        <div className="b-half">
          <TreeMap />
        </div>
        <div className="b-half">
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default Main;
