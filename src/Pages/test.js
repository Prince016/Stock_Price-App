import React, { useState } from "react";
import { CSVReader } from "react-csv-reader";
import { Bar } from "react-chartjs-2";

const Uploadcsv = () => {
  const [chartData, setChartData] = useState(null);

  const handleFileUpload = (data, fileInfo) => {
    // Process the CSV data and prepare it for the chart
    const labels = data.map((row) => row[0]);
    const values = data.map((row) => Number(row[1]));

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "CSV Data",
          data: values,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    setChartData(chartData);
  };

  return (
    <div>
      <h2>Upload a CSV File</h2>
      <CSVReader onFileLoaded={handleFileUpload} />

      {chartData && (
        <div>
          <h2>Chart</h2>
          <Bar data={chartData} />
        </div>
      )}
    </div>
  );
};

export default Uploadcsv;
