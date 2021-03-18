import React, { useRef, useState, useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";
import "./Chart.css";
import * as d3 from "d3";

//Responsive chart sizing
const ResizeObserve = (r) => {
  const [sizing, setsizing] = useState(null);

  useEffect(() => {
    const selectedobj = r.current;
    const resizeObserver = new ResizeObserver((objs) => {
      objs.forEach((obj) => {
        setsizing(obj.contentRect);
      });
    });

    resizeObserver.observe(selectedobj);
    return () => {
      resizeObserver.unobserve(selectedobj);
    };
  }, [r]);
  return sizing;
};

//d3 chart
function Chart({ data }) {
  const divRef = useRef();
  const chartRef = useRef();
  const sizing = ResizeObserve(divRef);
  const values = data.map((d) => d.value);
  const years = data.map((d) => d.year);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    if (!sizing) return;

    //x scale
    const x = d3.scaleBand()
      .domain(years)
      .range([0, sizing.width]) // change
      .padding(0.5);

    const maxY = Math.max(...values) + 0.1;
    const minY = Math.min(...values) - 0.1;

    //y scale
    const y = d3.scaleLinear()
      .domain([minY,maxY]) 
      .range([sizing.height, 0]);

    //xAxis
    const xAxis = d3.axisBottom(x).ticks(data.length);
    svg
      .select(".x")
      .style("transform", `translateY(${sizing.height}px)`)
      .call(xAxis);

    //yAxis
    const yAxis = d3.axisRight(y);
    svg
      .select(".y")
      .style("transform", `translateX(${sizing.width}px)`)
      .call(yAxis);

    //bars
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)")
      .attr("x", (d) => x(d.year))
      .attr("y", -sizing.height)
      .attr("width", x.bandwidth())
      .attr("fill", "#344ce6")
      .attr("height", (d) => sizing.height - y(d.value));

  }, [data, sizing, values, years]);

  return (
    <div className="container full chart graph">
      <div className="grid-x">
        <div className="cell small-12">
          <div ref={divRef}>
            <svg ref={chartRef}>
              <g className="x" />
              <g className="y" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;