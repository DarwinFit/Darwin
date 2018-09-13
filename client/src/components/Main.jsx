import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';

import Daily from './Daily.jsx';
import Food from './Food.jsx';
import Exercise from './Exercise.jsx';
import NavMain from './NavMain.jsx';

const Main = ({
	username,
	dailyNutrition,
	foodNutrition,
	exerciseData,
	foodItems,
	exerciseItems,
	handleAddExercise,
	logOut,
	searchFood,
	searchExercise,
	getDailyTotalFood,
	handleAddFood
}) => (
	<div>
		<NavMain handleLogOut={logOut} />
		<Switch>
			<Route
				exact
				path="/"
				render={() => (
					<Daily username={username} dailyNutrition={dailyNutrition} getDailyTotalFood={getDailyTotalFood} />
				)}
			/>

			<Route
				path="/food"
				render={() => (
					<Food
						username={username}
						foodNutrition={foodNutrition}
						items={foodItems}
						searchFood={searchFood}
						handleAddFood={handleAddFood}
					/>
				)}
			/>

			<Route
				path="/exercise"
				render={() => (
					<Exercise
						searchExercise={searchExercise}
						username={username}
						exerciseData={exerciseData}
						items={exerciseItems}
						handleAddExercise={handleAddExercise}
					/>
				)}
			/>
		</Switch>
	</div>
);

export default Main;
