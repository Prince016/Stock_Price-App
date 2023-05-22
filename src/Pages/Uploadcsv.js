import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import axios from "axios";
import Plot from "react-plotly.js";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from '@mui/material/Button';

const Uploadcsv = () => {
  const [csvData, setCsvData] = useState(null);
  var [stock_x_value, setstock_x_value] = useState([]);
  var [stock_y_value, setstock_y_value] = useState([]);
  var [typeChart, setTypeChart] = useState("line");
  var [company, setCompany] = useState();

  // =============Editable field ====================

  const [value, setValue] = useState("Default");
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (event) => {
    setValue(event.target.value);
    setCompany(event.target.value)
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // setCompany()
    // Perform any save/update logic here
  };

  // ==========================================

  const handleChange2 = (event) => {
    setTypeChart(event.target.value);
  };

  useEffect(() => {}, [typeChart]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    let finalStock_x_values = [];
    let finalStock_y_values = [];
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvString = event.target.result;
      Papa.parse(csvString, {
        header: true,
        complete: (results) => {
          //   const firstTwoColumns = results.data.map((row) => [
          //     row["Column1"],
          //     row["Column2"],
          //   ]);

          for (var key in results.data) {
            console.log("this is the key", results.data[key]);
            finalStock_x_values.push(results.data[key]["timestamp"]);
            finalStock_y_values.push(results.data[key]["close"]);
          }

          // console.log("th is si the result ---> ", results.data[0]["timestamp"]);
          //   setCsvData(firstTwoColumns);
          setstock_x_value(finalStock_x_values);
          setstock_y_value(finalStock_y_values);
          console.log("th is the y valus --------> ", finalStock_y_values);
          console.log("th is the x valus --------> ", finalStock_x_values);
        },
      });
    };
    reader.readAsText(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`upload_csv dropzone ${isDragActive ? "active" : ""}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the CSV file here</p>
        ) : (
          <p>Drag and drop a CSV file here, or click to select file</p>
        )}
      </div>
      <div>
        <div className="select_in_upload">
          <Box sx={{ minWidth: 120 }} className="select_box">
            <FormControl
              fullWidth
              style={{
                width: "20%",
                textAlign: "center",
                marginLeft: "200px",
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
       
        <h3 style={{margin:"10px" , padding:"10px" }} >
          Name of the company :{" "}
          {isEditing ? (
            <input placeholder="Enter the company name" type="text" value={value} onChange={handleInputChange} />
          ) : (
            <span style={{margin:"5px" , padding:"5px"}} >{value}</span>
            
          )}
          {isEditing ? (
            <Button  variant="outlined" color="success" onClick={handleSaveClick}>Save</Button>
          ) : (
            <Button variant="outlined" color="error" onClick={handleEditClick}>Edit</Button>
          )}
        </h3>

     
        
      </div>

      <div className="upload_main_section">
        <div className="chart_area">
          <Plot
            data={[
              {
                x: stock_x_value,
                y: stock_y_value,
                type: `${typeChart}`,
                mode: "lines+markers",
                marker: { color: "red" },
              },
            ]}
            layout={{ width: 920, height: 440, title: `${company} ${typeChart} Chart ` }}
          />
        </div>
      </div>

      {/* {csvData && (
          <div>
            <h2>CSV Data (First Two Columns)</h2>
            <table>
              <thead>
                <tr>
                  <th>Column 1</th>
                  <th>Column 2</th>
                </tr>
              </thead>
              <tbody>
                {csvData.map((row, index) => (
                  <tr key={index}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )} */}
    </div>
  );
};

export default Uploadcsv;

// const Uploadcsv = () => {
//     const [fileData, setFileData] = useState(null);
//     const [testfileData, settestFileData] = useState(null);

//     const onDrop = useCallback((acceptedFiles) => {
//       const file = acceptedFiles[0];

//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const csvData = event.target.result;
//         setFileData(csvData);

//       //   const extractedData = csvData.map((row) => [row[0], row[1]]);

//       //   settestFileData(extractedData);
//       //   console.log("this is the extracted datga",extractedData);

//       //   const vartype = typeof csvData;
//       //    console.log("this is the csv data ", typeof  csvData);
//       //    console.log("this is the csv data ",  vartype);
//       };
//       reader.readAsText(file);
//     }, []);

//     const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//     return (
//       <div>
//         <div style={{ border:"3px solid black" }}
//           {...getRootProps()}
//           className={`dropzone ${isDragActive ? "active" : ""}`}
//         >
//           <input {...getInputProps()} />
//           {isDragActive ? (
//             <p>Drop the CSV file here</p>
//           ) : (
//             <p>Drag and drop a CSV file here, or click to select file</p>
//           )}
//         </div>

//           {fileData && (
//             <div>
//               <h2>File Content:</h2>
//               <pre>{fileData}</pre>
//             </div>
//           )}
//       </div>
//     );
//   };
