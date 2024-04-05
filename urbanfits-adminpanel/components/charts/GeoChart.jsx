import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["States", "Full Name", "Popularity"],
  ["AE-DU", "Dubai", 900],
  ["AE-SH", "Sharjah", 300],
  ["AE-AZ", "Abu Dhabi", 400],
  ["AE-RK", "Ras Al Khaimah", 500],
  ["AE-AJ", "Ajman", 200],
  ["AE-UQ", "Umm Al-Quwain", 150],
  ["AE-FU", "Fujairah", 100],
];

export function GeoChart() {
  return <Chart
    chartEvents={[
      {
        eventName: "select",
        callback: ({ chartWrapper }) => {
          const chart = chartWrapper.getChart();
          const selection = chart.getSelection();
          if (selection.length === 0) return;
          const region = data[selection[0].row + 1];
          console.log("Selected : " + region);
        },
      },
    ]}
    chartType="GeoChart"
    width="100%"
    keepAspectRatio={true}
    data={data}
    options={{
      region: "AE",
      displayMode: "texts",
      enableRegionInteractivity: true,
      resolution: "provinces",
      domain: "AE",
      title: "UAE",
      colors: ['#82A6D8']
    }}
  />
}
