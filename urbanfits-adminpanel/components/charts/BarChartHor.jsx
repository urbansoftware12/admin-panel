import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const BarChartHor = ({country, dataArr}) => {


 const options = {
  responsive: true,
   indexAxis: 'y' ,
  plugins: {
    legend: {
      // position: 'top' ,
      display: false
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
  scales: {
    // to remove the labels
    x: {
      ticks: {
        display: true,
      },
  
      // to remove the x-axis grid
      grid: {
        drawBorder: true,
        display: true,
        offset: true
      },
    },
    // to remove the y-axis labels
    y: {
      ticks: {
        display: true,
        beginAtZero: true,
      },
      // to remove the y-axis grid
      grid: {
        drawBorder: false,
        display: false,
      },
    },
  },
};

const labels = country;

 const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [  5, 15, 20 ],
      barThickness: 9,
      backgroundColor: '#88AAF3',
    },
    
    
    
  ],
};





    return (
        <Bar width={50}
              height={20}
         options={options} data={data} /> 
        
         )
}

export default BarChartHor