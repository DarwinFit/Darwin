import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';

import Daily from './Daily.jsx';
import Food from './Food.jsx';
import Exercise from './Exercise.jsx';
import Navigation from "./Navigation.jsx";

const Main = ({username, dailyNutrition, foodNutrition,
                exerciseData, foodItems, exerciseItems,
                handleAddExercise, onDelete}) => (
  <div>
    <Navigation />
    <Switch>
    <Route exact path="/" render={() => (
      <Daily 
        username={username}
        dailyNutrition={dailyNutrition}
      />
    )}/>

    <Route path="/food" render={() => (
      <Food
        username={username}
        foodNutrition={foodNutrition}
        items={foodItems}
        onDelete={onDelete}
      />
    )}/>

    <Route path="/exercise" render={() => (
      <Exercise
        username={username}
        exerciseData={exerciseData}
        items={exerciseItems}
        handleAddExercise={handleAddExercise}
        onDelete={onDelete}
      />
    )}/> 
    </Switch>
  </div>

);

export default Main;