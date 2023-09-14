import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: 'index' ,
    intersect: false,
  },
  // stacked: false,
  plugins: {
    legend: {
      display:false,
      // position: 'top' ,
    },
    // title: {
    //   display: true,
    //   text: 'Chart.js Line Chart - Multi Axis',
    // },
  },
  scales: {
    x: {
      ticks: {
        display: true,
      },
  
      // to remove the x-axis grid
      grid: {
        drawBorder: false,
        display: false,
      },
    },
  //   // y: {
  //   //   type: 'linear' ,
  //   //   display: true,
  //   //   position: 'left' ,
  //   // },
  //   // y1: {
  //   //   type: 'linear' ,
  //   //   display: true,
  //   //   position: 'right' ,
  //   //   grid: {
  //   //     drawOnChartArea: false,
  //   //   },
  //   // },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Active',
      data: [0,50,100,150,200],
      borderColor: '#75A0FF',
      backgroundColor: '#75A0FF',
      pointRadius: 5,
      pointBackgroundColor: '#FFFFFF',
      pointBorderWidth: 2

    },
    {
      label: 'In Active',
      data:  [50,100,200,150,250],
      borderColor: '#FFD23F',
      backgroundColor: '#FFD23F',
      pointRadius: 5,
      borderWidth: 1,
      pointBackgroundColor: '#FFFFFF',
      pointBorderWidth: 2,
      borderDash: [10,7]
      // borderDashOffset: 10,

    },
  ],
};



const LineChart2 = () => {
    return (
        <Line options={options} data={data} /> 
         )
}

export default LineChart2