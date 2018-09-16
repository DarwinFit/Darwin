import React from 'react';
import { Line } from 'react-chartjs-2';

// intakeData and burntData are an array of objects.
// Each object within the array contains that x and y values of each point
let intake = [{x: 0, y: 2019}, 
              {x: 1, y: 2039}, 
              {x: 2, y: 1870}]
let burnt = [{x: 0, y: 2089}, 
             {x: 1, y: 1939}, 
             {x: 2, y: 2018}]


const HomeBack = () => (
  <div className="chart">
    <Line 
      data={{
        xAxisID: 'Date',
        yAxisID: 'Calories [kcal]',
        datasets: [{
            label: 'Intake',
            data: intake,
            backgroundColor: 'rgba(196, 224, 40, 0.5)',
            pointBackgroundColor: 'rgba(0, 0, 0, 0.0)',
            pointBorderWidth: 0,
            pointHoverBorderColor: 'rgba(0, 0, 0, 0.0)'
          }, {
            label: 'Burnt',
            data: burnt,
            backgroundColor: 'rgba(112, 157, 11, 0.5)',
          }],
        backgroundColor: 'rgba(0, 0, 0, 1)'
      }} 
      options={{
        scales: {
          xAxes: [{
            type: 'linear',
            distribution: 'series',
            position: 'bottom'
          }],
          yAxes: [{
            type: 'linear',
            distribution: 'series',
          }]
        },
        legend: {
          display: false,
          position: 'right'
        }
      }}/> 
  </div>
)

export default HomeBack;