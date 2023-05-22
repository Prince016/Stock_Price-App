import axios from "axios";
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useMediaQuery } from "react-responsive";

const Home = () => {
  const isMobile = useMediaQuery({ maxWidth: 1000 });

  var [stock_x_value, setstock_x_value] = useState([]);
  var [stock_y_value, setstock_y_value] = useState([]);
  var [company, setCompany] = useState("AMZN");
  var [typeChart, setTypeChart] = useState("line");
  var [time, setTime] = useState();
  const [age, setAge] = useState("WEEKLY");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleChange2 = (event) => {
    setTypeChart(event.target.value);
  };
  const handleChange3 = (event) => {
    setCompany(event.target.value);
  };
  console.log("outsid the function ---------> ", age);

  useEffect(() => {
    fetchData();
  }, [age, typeChart, company]);

  const fetchData = async () => {
    const API_KEY = "50ZGY71DYWZ3L2E1";
    let StockSymbol = "";
    let finalStock_x_values = [];
    let finalStock_y_values = [];
    console.log("insid teht fetch datga ", age);
    var URL = `https://www.alphavantage.co/query?function=TIME_SERIES_${age}&symbol=${company}&apikey=${API_KEY}`;

    axios.get(URL).then((response) => {
      console.log(response.data);
      const result = response.data;

      if (age === "DAILY_ADJUSTED") {
        var final_data = result["Time Series (Daily)"];
      } else if (age === "WEEKLY") {
        var final_data = result["Weekly Time Series"];
      } else {
        var final_data = result["Monthly Time Series"];
      }
      for (var key in final_data) {
        // for (var key in result[2]) {
        finalStock_x_values.push(key);
        finalStock_y_values.push(final_data[key]["4. close"]);
      }
      console.log("final x values ----> ", finalStock_x_values);
      console.log(finalStock_y_values);

      setstock_x_value(finalStock_x_values);
      setstock_y_value(finalStock_y_values);
    });
  };

  return (
    <div className="show_section">
      <h2
        className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3"
        style={{
          color: "#1976CF",
          marginTop: "10px",
          fontSize: "40px",
          textAlign: "center",
          textshadow: "0px 0px 3px gray",
        }}
      >
        Stock Price Info
      </h2>

      <div className="select_dropdown ">
        <div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl
              fullWidth
              style={{
                width: "70%",
                textAlign: "center",
                marginLeft: isMobile ? "0px" : "200px",
                marginTop: "20px",
              }}
            >
              <InputLabel id="demo-simple-select-label">Time Period</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value="DAILY_ADJUSTED">Day</MenuItem>
                <MenuItem value="WEEKLY">Week</MenuItem>
                <MenuItem value="MONTHLY">Month</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl
              fullWidth
              style={{
                width: "70%",
                textAlign: "center",
                marginLeft: isMobile ? "0px" : "200px",
                marginTop: "20px",
              }}
            >
              <InputLabel id="demo-simple-select-label">Company</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={company}
                label="Charts"
                onChange={handleChange3}
              >
                <MenuItem value="AMZN">Amazon</MenuItem>
                <MenuItem value="META">Facebook</MenuItem>
                <MenuItem value="AAPL">Apple</MenuItem>
                <MenuItem value="TCS">TCS</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl
              fullWidth
              style={{
                width: "70%",
                textAlign: "center",
                marginLeft: isMobile ? "0px" : "200px",
                marginTop: "20px",
              }}
            >
              <InputLabel id="demo-simple-select-label">Charts</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={typeChart}
                label="Charts"
                // defaultValue="DAILY"
                onChange={handleChange2}
              >
                {/* <MenuItem value="scatter">Scatter</MenuItem> */}
                <MenuItem value="line">Line</MenuItem>
                <MenuItem value="bar">Bar</MenuItem>
                {/* <MenuItem value="pie">Pie</MenuItem> */}
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>

      <div className="stocks_info2">
        <h3 style={{ float: "right", margin: "10px" }}>
          {" "}
          <span style={{ color: "red" }}> {company} </span> Stock Price{" "}
        </h3>
      </div>
      <div className="main_section">
        <div className="chart_area" id="chart">
          {isMobile ? (
            <Plot
              className="inside_chart"
              data={[
                {
                  x: stock_x_value,
                  y: stock_y_value,
                  type: `${typeChart}`,
                  mode: "lines+markers",
                  marker: { color: "red" },
                },
              ]}
              layout={{
                width: 300,
                height: 250,
                // title: ` ${typeChart} Chart with  ${age} Time Period`,
              }}
            />
          ) : (
            <Plot
              className="inside_chart"
              data={[
                {
                  x: stock_x_value,
                  y: stock_y_value,
                  type: `${typeChart}`,
                  mode: "lines+markers",
                  marker: { color: "red" },
                },
              ]}
              layout={{
                width: 920,
                height: 520,
                title: ` ${typeChart} Chart with  ${age} Time Period`,
              }}
            />
          )}
          {/* <Plot
            className="inside_chart"
            data={[
              {
                x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11],
                y: [2, 6, 3, 6, 7, 8, 9, 12, 13, 14],
                type: `${typeChart}`,
                mode: "lines+markers",
                marker: { color: "red" },
              },
            ]}
            layout={{
              width: chartWidth,
              height: chartHeight,
              title: ` ${typeChart} Chart with  ${age} Time Period`,
            }}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;

// x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11],
//                 y: [2, 6, 3, 6, 7, 8, 9, 12, 13, 14],
