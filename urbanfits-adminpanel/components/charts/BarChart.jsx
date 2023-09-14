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

export const options = {
  responsive: true,
  //  indexAxis: 'y' ,
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
        display: false,
      },
  
      // to remove the x-axis grid
      grid: {
        drawBorder: false,
        display: false,
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
        drawBorder: true,
        display: true,
      },
    },
  },
};

const labels = ['1','2','3', '4', '5', '6'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [ 3, 30, 10, 20, 55, 50 ],
      barThickness: 9,
      backgroundColor: '#88AAF3',
    },
    
    
    
  ],
};



const BarChart = () => {
    return (
        <Bar width={40}
              height={50}
         options={options} data={data} /> 
        
         )
}

export default BarChart