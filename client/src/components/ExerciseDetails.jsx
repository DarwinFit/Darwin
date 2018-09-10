import React, { Component } from 'react';

const ExerciseDetail = ({ username, exerciseData, handleAddExercise }) => {
	return (
		//creating a div with className for future styling
		//Inside of it, we displaying the username which was passed in by props, with the exercise results for searched exercise
		//Adding a button to handle adding it to the list of the exercises by executing the function from the main component
		<div className="exerciseDetail">
			<h2>Hey ,{username}, below are the details of your searched exercise results!</h2>
			<button>Add</button>
		</div>
	);
};

export default ExerciseDetail;
