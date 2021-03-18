import React from "react";
import "./foundation.css";
import "./App.css";
import Columns from "../Columns/Columns";
import Chart from "../Graph/Chart";
import * as d3 from "d3";
import Select from 'react-dropdown-select';

// D3 chart app test by Dan C
function App() {
  const fromYear = "2000"; // initial from year
  const toYear = "2020"; // initial to year
  const [state, setState] = React.useState({
    data: [],
    load: true,
    dataFull: [],
    options: [],
    to: toYear,
    from: fromYear,
    isError: false
  });
  const compare = (z, zz) =>
  z.length === zz.length &&
  z.every((a, b) => a === zz[b]);

  const { data, load, dataFull, options, to, from, isError } = state;

  //update state by merging
  function updateState(data) {
    setState((prevState) => Object.assign({}, prevState, data))
  }

  //From Dropdown handler
  function DoDropdownFrom(props) {
    var inYear = props[0].year;
    if(inYear === from) {
      return;
    }
    var filteredData = dataFull.filter((x) => x.year >= inYear && x.year <= to);
    var err = to < inYear ? true: false;
    updateState({
      from: inYear, 
      data: filteredData,
      isError: err });
  }

  //To Dropdown handler
  function DoDropdownTo(props) {
    var inYear = props[0].year;

    if(inYear === to) {
      return;
    }
    var filteredData = dataFull.filter((x) => x.year >= from && x.year <= inYear);
    var err = inYear < from ? true: false;

    updateState({
      to: inYear, 
      data: filteredData,
      isError: err });
  }

  //Update data if needed
  React.useEffect(() => {
    var outData = dataFull.filter((x) => x.year >= from && x.year <= to);

    if(compare(data,outData) === false) {
      // update state
      updateState({
        data: outData,
      });
    }
  }, [to, from, dataFull]);

  //Get data
  React.useEffect(() => {
    if(data.length === 0) {
      d3.json("https://www.ncdc.noaa.gov/cag/global/time-series/globe/land_ocean/1/10/1880-2020/data.json").then((d) => {
        var convertedData = []; 
        var convertedOptions = []; 
        var outData;
        //Convert json data
        for(var key in d.data) {
          var value = d.data[key];
          var dataOut = {"year":key, value};
          var optionOut = {"year":key}
          convertedData.push(dataOut)
          convertedOptions.push(optionOut)
        }

        outData = convertedData.filter((x) => x.year >= from && x.year <= to);

        // update state
        updateState({
          data: outData,
          load: false,
          dataFull: convertedData,
          options: convertedData
        });
      });
    }
  }, []);

  return <>
    <div className="grid-x chart dropdowns">
      <div className="cell small-12 medium-shrink">
        <div className="title">From:</div>
        <div className="dropdown">
        <Select
          options={options}
          onChange={(values) => DoDropdownFrom(values)}
          labelField="year"
          valueField="year"
          color= "#0074D9"
          values = {dataFull.filter((d) => d.year === from)}
        />
        </div>
      </div>
      <div className="cell shrink">
      <div className="title">To:</div>
        <div className="dropdown">
        <Select
          options={options.map((x) => x).reverse()}
          onChange={(values) => DoDropdownTo(values)}
          labelField="year"
          valueField="year"
          color= "#0074D9"
          values = {dataFull.filter((d) => d.year === to)}
        />
        </div>
      </div>
      <div className="cell shrink buttonCell">
          <button onClick={() => updateState({to:toYear, from:fromYear, isError: false})}>
          Reset Dates
          </button>
        </div>
    </div>
    {isError && <div className="grid-x chart"><div class="error cell small-12">Error: To date is before the from date. Please fix.</div></div>}
    {!load && <Chart data={data} />}
    <Columns />
  </>;
}

export default App;
