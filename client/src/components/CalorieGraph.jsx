import React from 'react';
import { Line } from 'react-chartjs-2';

// intakeData and burntData are an array of objects.
// Each object within the array contains that x and y values of each point
let intake = [{t: new Date(2018, 8, 1), y: 2019}, 
              {t: new Date(2018, 8, 2), y: 2039}, 
              {t: new Date(2018, 8, 3), y: 1870}]
let burnt = [{t: new Date(2018, 8, 1), y: 2089}, 
             {t: new Date(2018, 8, 2), y: 1939}, 
             {t: new Date(2018, 8, 3), y: 2018}]


const CalorieGraph = ({intakeData, burntData}) => (
  <div className="chart">
    <Line 
      data={{
        xAxisID: 'Date',
        yAxisID: 'Calories [kcal]',
        datasets: [{
            label: 'Intake',
            data: intake,
            backgroundColor: 'rgba(196, 224, 40, 0.5)',
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
            time: {
              unit: 'day',
              displayFormats: {
                day: 'MMM D YY'
              }
            },
            type: 'time',
            distribution: 'series',
            position: 'bottom',
            labelString: 'Date'
          }]
        },
        legend: {
          display: true,
          position: 'right'
        }
      }}/> 
  </div>
)

export default CalorieGraph;