import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

var options = {  
    responsive: true,
    maintainAspectRatio: true,      
    cutout: 90,
};



export const data = {
//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      // label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        '#50D7AB',
        '#88AAF3',
        '#9586CD',
        '#A4D9E5',
        '#F3D676',
        '#ED9090',
      ],
      // borderColor: [
      //   'rgba(255, 99, 132, 1)',
      //   'rgba(54, 162, 235, 1)',
      //   'rgba(255, 206, 86, 1)',
      //   'rgba(75, 192, 192, 1)',
      //   'rgba(153, 102, 255, 1)',
      //   'rgba(255, 159, 64, 1)',
      // ],
    //   borderWidth: 1,
    },
  ],
};


const DoughnutChart = () => {
    return <Doughnut
     data={data} options={options} />;
}

export default DoughnutChart