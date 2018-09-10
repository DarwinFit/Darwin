import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {BrowserRouter} from 'react-router-dom';

// import Navigation from './components/Navigation.jsx';
import Main from './components/Main.jsx';
import Home from './components/Home.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'J',
      foodNutrition: {
        name: 'Pizza',
        serving_qty: 0,
        serving_wt_g: 0,
        sugar: 0,
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0
      },
      dailyNutrition: {
        sugar: 0,
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0
      },
      exerciseData: {
        name: 'running',
        duration_min: 30,
        nf_calories: 150
      },
      foodItems: ['1 Slice of Pizza'],
      exerciseItems: ['30 minutes of running']
    };

    this.handleAddFood = this.handleAddFood.bind(this);
    this.handleAddExercise = this.handleAddExercise.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  handleAddFood() {
    return;
  }

  handleAddExercise() {
    return;
  }

  onDelete(item) {
    return;
  }

  render() {
  if (this.state.username===''){
    return (<Home />)
  } else {
    return (
      <Main 
        username={this.state.username}
        dailyNutrition={this.state.dailyNutrition}
        foodNutrition={this.state.foodNutrition}
        handleAddFood={this.handleAddFood}
        showFood={this.state.showFood}
        foodItems={this.state.foodItems}
        exerciseItems={this.state.exerciseItems}
        exerciseData={this.state.exerciseData}
        handleAddExercise={this.handleAddExercise}
        onDelete={this.onDelete}
      />)
    }
  }
}

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'));
