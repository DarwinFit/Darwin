import React from 'react';
import { Line } from 'react-chartjs-2';

// intakeData and burntData are an array of objects.
// Each object within the array contains that x and y values of each point


const CalorieGraph = ({dailyNutrition, userData}) => {
  let todayburnt = dailyNutrition.calories + userData.avg_calories;
  let todayintake = dailyNutrition.burnt;
  let intake = [{t: new Date(2018, 8, 15), y: 2019}, 
                {t: new Date(2018, 8, 16), y: 2039}, 
                {t: new Date(2018, 8, 17), y: todayburnt}]
  let burnt = [{t: new Date(2018, 8, 15), y: 2089}, 
              {t: new Date(2018, 8, 16), y: 1939}, 
              {t: new Date(2018, 8, 17), y: todayintake}]
  return (
  <div className="chart-container">
    <h2 className="graph-title">Calorie History</h2>
    <div className="chart">
      <Line 
        data={{
          xAxisID: 'Date',
          yAxisID: 'Calories [kcal]',
          datasets: [{
              label: 'Intake',
              data: intake,
              borderColor: 'rgba(196, 224, 40, 0.8)',
              backgroundColor: 'rgba(196, 224, 40, 0.5)',
            }, {
              label: 'Burnt',
              data: burnt,
              borderColor: 'rgba(112, 157, 11, 0.8)',
              backgroundColor: 'rgba(112, 157, 11, 0.5)',
            }],
          backgroundColor: 'rgba(0, 0, 0, 1)'
        }} 
        options={{
          backgroundColor: 'rgba(0, 0, 0, 1)',
          scales: {
            xAxes: [{
              time: {
                unit: 'day',
                displayFormats: {
                  day: 'MMM D YY'
                }
              },
              gridLines: {
                display: true
              },
              type: 'time',
              distribution: 'series',
              position: 'bottom',
              labelString: 'Date'
            }],
            yAxes: [{
              gridLines: {
                display: true
              },
              type: 'linear',
              distribution: 'series',
              position: 'left',
              labelString: 'Calories [kcal]'
            }]
          },
          elements: {
            point: {
              radius: 5
            }
          },
          legend: {
            display: true,
            position: 'bottom'
          },
          tooltips: {
            enabled: true,
            mode: 'label'
          }
        }}/> 
    </div>
  </div>
); }

export default CalorieGraph;