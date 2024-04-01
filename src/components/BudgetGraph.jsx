import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale } from 'chart.js/auto';

ChartJS.register(CategoryScale);

const BudgetGraph = ({ data }) => {
  const chartData = {
    labels: ['Expenses', 'Earnings'],
    datasets: [
      {
        label: 'Amount',
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
        hoverBackgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)'],
        hoverBorderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        data: [data.expenses, data.earnings],
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [{
        type: 'category', // Set the type of scale to 'category'
        ticks: {
          beginAtZero: true,
        },
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
      }],
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BudgetGraph;
