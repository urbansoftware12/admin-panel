import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { orderStatuses } from '@/uf.config';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  datasets: [
    {
      label: '# of Votes',
      data: [12, 3, 3, 5, 2, 3, 4, 2, 1, 10, 5, 7, 9],
      backgroundColor: Object.keys(orderStatuses).map(status => orderStatuses[status].bg)
    }
  ]
};

const DoughnutChart = () => {
  return <Doughnut
    data={{
      datasets: [
        {
          data: [12, 3, 3, 5, 2, 3, 4, 2, 1, 10, 5, 7, 9],
          backgroundColor: Object.keys(orderStatuses).map(status => orderStatuses[status].bg)
        }
      ]
    }}
    options={{
      responsive: true,
      maintainAspectRatio: true,
      cutout: 75,
    }} />;
}

export default DoughnutChart